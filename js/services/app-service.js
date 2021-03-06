define(['app'], function (app) {
    /**
     * Angular Service
     */
    app.service('appService', [function () {
        this.storeUser = function (userObj) {
            key = userObj.lastname.toUpperCase() + userObj.firstname;
            localStorage.setItem(key, JSON.stringify(userObj));
        };
        this.showToast = function ($scope, message) {
            var x = document.getElementById("toastMessage");
            $scope.toastMessage = message;
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 2500);
        };
        this.resetForm = function ($scope) {
            $scope.input = {};
            $scope.searchTerm = "";
            $scope.employeeForm.firstname.$pristine = true
            $scope.employeeForm.lastname.$pristine = true;
            $scope.employeeForm.email.$pristine = true;
            $scope.employeeForm.title.$pristine = true;
            $scope.employeeForm.role.$pristine = true;
        };
        this.getEmployeeList = function () {
            var employees = {};
            for (var i = 0; i < localStorage.length; i++) {
                var value = localStorage.getItem(localStorage.key(i));
                if ((constants.regex.validJson.test(value.replace(constants.regex.json1, '@').
                    replace(constants.regex.json2, ']').
                    replace(constants.regex.json3, '')))) {
                    var obj = JSON.parse(value);
                    if (obj.isFromScript) {
                        employees[localStorage.key(i)] = obj;
                    }
                }
            }
            return employees;
        };
        this.separateSocialAccounts = function (social_urls) {
            var socialUrlObj = {};
            if ('undefined' !== typeof social_urls) {
                var socialUrlsArray = social_urls.split(';');
                socialUrlsArray.forEach(function (social_url) {
                    if (social_url.match(constants.regex.facebook)) {
                        socialUrlObj['facebook'] = social_url;
                    } else if (social_url.match(constants.regex.linkedin)) {
                        socialUrlObj['linkedin'] = social_url;
                    } else if (social_url.match(constants.regex.twitter)) {
                        socialUrlObj['twitter'] = social_url;
                    }
                });
            }
            return socialUrlObj;
        };
        this.setPredefinedData = function () {
            var social_urls = this.separateSocialAccounts('https://www.linkedin.com/in/satyam-singh-19193237/;https://www.facebook.com/profile.php?id=100000889900968');
            var employee1 = {
                'firstname': 'Satyam',
                'lastname': 'Singh',
                'email': 'satyam@gmail.com',
                'title': 'Software Engineer',
                'role': ' UI Developer',
                'social_urls': social_urls,
                'isPrimaryCompany': true,
                'isFromScript': true
            };
            social_urls = this.separateSocialAccounts('https://www.linkedin.com/in/satyam-singh-19193237/;https://www.facebook.com/profile.php?id=100000889900968;https://twitter.com/iamsinghsatyam');
            var employee2 = {
                'firstname': 'Satyam',
                'lastname': 'singh',
                'email': 'satyamsingh@gmail.com',
                'title': 'Software Engineer',
                'role': 'Frontend Developer',
                'social_urls': social_urls,
                'isPrimaryCompany': false,
                'isFromScript': true
            };
            social_urls = this.separateSocialAccounts('https://www.facebook.com/profile.php?id=100000889900968');
            var employee3 = {
                'firstname': 'Rahul',
                'lastname': 'Singh',
                'email': 'rahulsingh@gmail.com',
                'title': 'Software Engineer',
                'role': 'UI Engineer',
                'social_urls': social_urls,
                'isPrimaryCompany': true,
                'isFromScript': true
            };
            this.storeUser(employee1);
            this.storeUser(employee2);
            this.storeUser(employee3);
        };
        this.setLabels = function ($scope) {
            $scope.labels = messages.labels;
            $scope.checkCounter = 0;
        };
    }]);
});