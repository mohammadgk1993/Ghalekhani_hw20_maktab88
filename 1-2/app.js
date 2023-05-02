var User = /** @class */ (function () {
    function User(firstName, lastName, email, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = id;
    }
    return User;
}());
var ReqresUsers = /** @class */ (function () {
    function ReqresUsers(localStorageKey) {
        this.users = [];
        this.localStorage = new LocalStorageManager(localStorageKey);
        var storedUsers = this.localStorage.data;
        if (storedUsers && Array.isArray(storedUsers)) {
            this.users = storedUsers.map(function (user) { return new User(user.firstName, user.lastName, user.email, user.id); });
        }
    }
    ReqresUsers.prototype.addUser = function (firstName, lastName, email, id) {
        if (this.users.some(function (item) { return item.id == id; })) {
            return;
        }
        if (this.users.some(function (item) { return item.email == email; })) {
            return;
        }
        var user = new User(firstName, lastName, email, id);
        this.users.push(user);
        this.localStorage.data = this.users;
    };
    Object.defineProperty(ReqresUsers.prototype, "allUsers", {
        get: function () {
            return this.users;
        },
        enumerable: false,
        configurable: true
    });
    ReqresUsers.prototype.deleteAllUser = function () {
        this.users = [];
        this.localStorage.data = this.users;
    };
    ReqresUsers.prototype.getSingleUser = function (id) {
        return this.users.find(function (item) { return item.id == id; });
    };
    ReqresUsers.prototype.removeUser = function (id) {
        if (id >= 0) {
            // this.users.splice(userIndex, 1);
            // this.localStorage.data = this.users;
            this.users = this.users.filter(function (item) { return item.id != id; });
            this.localStorage.data = this.users;
        }
    };
    ReqresUsers.prototype.updateUser = function (firstName, lastName, email, id) {
        var userIndex = this.users.findIndex(function (item) { return item.id == id; });
        this.users[userIndex].firstName = firstName;
        this.users[userIndex].lastName = lastName;
        this.users[userIndex].email = email;
        this.localStorage.data = this.users;
    };
    return ReqresUsers;
}());
var LocalStorageManager = /** @class */ (function () {
    function LocalStorageManager(key) {
        this.key = key;
    }
    Object.defineProperty(LocalStorageManager.prototype, "data", {
        get: function () {
            var data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : null;
        },
        set: function (value) {
            localStorage.setItem(this.key, JSON.stringify(value));
        },
        enumerable: false,
        configurable: true
    });
    LocalStorageManager.prototype.clear = function () {
        localStorage.removeItem(this.key);
    };
    return LocalStorageManager;
}());
var reqresUsers = new ReqresUsers("reqresUsers");
if (!localStorage.getItem("reqresUsers")) {
    for (var _i = 0, _a = [1, 2]; _i < _a.length; _i++) {
        var i = _a[_i];
        fetch("https://reqres.in/api/users?page=".concat(i))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            for (var i_1 = 0; i_1 < data.data.length; i_1++) {
                reqresUsers.addUser(data.data[i_1].first_name, data.data[i_1].last_name, data.data[i_1].email, data.data[i_1].id);
            }
        });
    }
}
$(function () {
    tableRenderer();
    $("#add-user").on("submit", addUser);
    $('tr').on("click", userInfo);
    $("#update-user").on("submit", updateUser);
    $("#delete-user").on("submit", deleteUser);
    $("#delete-all").on("click", deleteAllUsers);
    $("#read-user-button").on("click", readUser);
});
function tableRenderer() {
    $("table thead").empty();
    $("table tbody").empty();
    $("table thead").append("<tr></tr>");
    for (var _i = 0, _a = Object.keys(reqresUsers.allUsers[0]); _i < _a.length; _i++) {
        var key = _a[_i];
        $("table thead tr").append("<th>".concat(key, "</th>"));
    }
    for (var _b = 0, _c = reqresUsers.allUsers; _b < _c.length; _b++) {
        var item = _c[_b];
        $("table tbody").append("<tr></tr>");
        for (var _d = 0, _e = Object.values(item); _d < _e.length; _d++) {
            var val = _e[_d];
            $("table tbody tr:last").append("<td>".concat(val, "</td>"));
        }
        $("table tbody tr:last").attr("id", Object.values(item)[3]);
        console.log(reqresUsers.allUsers.indexOf(item));
    }
}
function userInfo() {
    var id = $(this).attr('id');
    var user = reqresUsers.getSingleUser(Number(id));
    $("#update-user-id").val(String(id));
    $("#update-user-firstname").val(Object(user).firstName);
    $("#update-user-lastname").val(Object(user).lastName);
    $("#update-user-email").val(Object(user).email);
}
function addUser() {
    var _a, _b, _c, _d, _e, _f, _g;
    if (((_a = $("#user-firstname").val()) === null || _a === void 0 ? void 0 : _a.toString().trim()) != "" && ((_b = $("#user-lastname").val()) === null || _b === void 0 ? void 0 : _b.toString().trim()) != ""
        && ((_c = $("#user-email").val()) === null || _c === void 0 ? void 0 : _c.toString().trim()) != "" && ((_d = $("#user-id").val()) === null || _d === void 0 ? void 0 : _d.toString().trim()) != "") {
        reqresUsers.addUser((_e = $("#user-firstname").val()) === null || _e === void 0 ? void 0 : _e.toString(), (_f = $("#user-lastname").val()) === null || _f === void 0 ? void 0 : _f.toString(), (_g = $("#user-email").val()) === null || _g === void 0 ? void 0 : _g.toString(), Number($("#user-id").val()));
        tableRenderer();
    }
}
function updateUser() {
    var _a, _b, _c, _d, _e, _f;
    if (((_a = $("#update-user-firstname").val()) === null || _a === void 0 ? void 0 : _a.toString().trim()) != "" && ((_b = $("#update-user-lastname").val()) === null || _b === void 0 ? void 0 : _b.toString().trim()) != ""
        && ((_c = $("#update-user-email").val()) === null || _c === void 0 ? void 0 : _c.toString().trim()) != "") {
        reqresUsers.updateUser((_d = $("#update-user-firstname").val()) === null || _d === void 0 ? void 0 : _d.toString(), (_e = $("#update-user-lastname").val()) === null || _e === void 0 ? void 0 : _e.toString(), (_f = $("#update-user-email").val()) === null || _f === void 0 ? void 0 : _f.toString(), Number($("#update-user-id").val()));
        tableRenderer();
    }
}
function deleteUser() {
    reqresUsers.removeUser(Number($("#delete-user-id").val()));
    tableRenderer();
}
function deleteAllUsers() {
    reqresUsers.deleteAllUser();
    tableRenderer();
}
function readUser() {
    var user = Object(reqresUsers.getSingleUser(Number($("#read-user-id").val())));
    console.log(user);
    $("table tbody").empty();
    $("table tbody").append("<tr></tr>");
    for (var _i = 0, _a = Object.values(user); _i < _a.length; _i++) {
        var val = _a[_i];
        $("table tbody tr:last").append("<td>".concat(val, "</td>"));
    }
}
