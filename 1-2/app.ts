class User {
    firstName: string
    lastName: string
    email: string
    id: number
    
    constructor(firstName: string,lastName: string,email: string,id: number) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.id = id
    }
}


class ReqresUsers {
    private users: User[];
    private localStorage: LocalStorageManager;

    constructor(localStorageKey: string) {
        this.users = [];
        this.localStorage = new LocalStorageManager(localStorageKey);

        const storedUsers = this.localStorage.data;
        if (storedUsers && Array.isArray(storedUsers)) {
            this.users = storedUsers.map(user => new User(user.firstName,user.lastName,user.email,user.id));
        }
    }


    public addUser(firstName: string,lastName: string,email: string,id: number): void {
        if (this.users.some(item => item.id == id)) {
            return
        }
        if (this.users.some(item => item.email == email)) {
            return
        }
        const user = new User(firstName, lastName, email, id);
        this.users.push(user);
        this.localStorage.data = this.users;
    }


    get allUsers(): User[] {
        return this.users;
    }


    public deleteAllUser(): void {
        this.users = []
        this.localStorage.data = this.users
    }


    public getSingleUser(id:number) {
        return this.users.find(item => item.id == id)
    }


    public removeUser(id: number): void {
        if (id >= 0) {
            // this.users.splice(userIndex, 1);
            // this.localStorage.data = this.users;
            this.users = this.users.filter(item => item.id != id)
            this.localStorage.data = this.users;
        }
    }


    public updateUser(firstName: string, lastName: string, email:string, id:number): void {
        const userIndex:number = this.users.findIndex(item => item.id == id)
        this.users[userIndex].firstName = firstName
        this.users[userIndex].lastName = lastName
        this.users[userIndex].email = email
        this.localStorage.data = this.users;
    }
}


class LocalStorageManager {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get data(): any {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    set data(value: any) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    clear(): void {
        localStorage.removeItem(this.key);
    }
}

const reqresUsers = new ReqresUsers("reqresUsers")

if(!localStorage.getItem("reqresUsers")) {
    for (let i of [1,2]) {
        fetch(`https://reqres.in/api/users?page=${i}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0 ; i < data.data.length ; i++) {
                reqresUsers.addUser(data.data[i].first_name,data.data[i].last_name,data.data[i].email,data.data[i].id)
            }
        })
    }
}

$(() => {
    tableRenderer()

    $("#add-user").on("submit", addUser)

    $('tr').on("click", userInfo); 

    $("#update-user").on("submit", updateUser)

    $("#delete-user").on("submit", deleteUser)

    $("#delete-all").on("click", deleteAllUsers)

    $("#read-user-button").on("click", readUser)
})


function tableRenderer() {
    $("table thead").empty()
    $("table tbody").empty()

    $("table thead").append("<tr></tr>")
    for (let key of Object.keys(reqresUsers.allUsers[0])) {
        $("table thead tr").append(`<th>${key}</th>`)
    }

    for (let item of reqresUsers.allUsers) {
        $("table tbody").append("<tr></tr>")
        for (let val of Object.values(item)) {
            $("table tbody tr:last").append(`<td>${val}</td>`)
        }
        $("table tbody tr:last").attr("id",Object.values(item)[3])
        console.log(reqresUsers.allUsers.indexOf(item))
    }
}

function userInfo() {
    const id = $(this).attr('id');
    const user = reqresUsers.getSingleUser(Number(id))
    $("#update-user-id").val(String(id))
    $("#update-user-firstname").val(Object(user).firstName)
    $("#update-user-lastname").val(Object(user).lastName)
    $("#update-user-email").val(Object(user).email)
}

function addUser() {
    if ($("#user-firstname").val()?.toString().trim() != "" && $("#user-lastname").val()?.toString().trim() != ""
    && $("#user-email").val()?.toString().trim() != "" && $("#user-id").val()?.toString().trim() != "") {
reqresUsers.addUser($("#user-firstname").val()?.toString(),
        $("#user-lastname").val()?.toString(),
        $("#user-email").val()?.toString(),
        Number($("#user-id").val()))
        tableRenderer()
    }
}


function updateUser() {
    if ($("#update-user-firstname").val()?.toString().trim() != "" && $("#update-user-lastname").val()?.toString().trim() != ""
    && $("#update-user-email").val()?.toString().trim() != "") {
        reqresUsers.updateUser($("#update-user-firstname").val()?.toString(),
        $("#update-user-lastname").val()?.toString(),
        $("#update-user-email").val()?.toString(),
        Number($("#update-user-id").val()))
        tableRenderer()
    }
}


function deleteUser() {
    reqresUsers.removeUser(Number($("#delete-user-id").val()))
    tableRenderer()
}


function deleteAllUsers() {
    reqresUsers.deleteAllUser()
    tableRenderer()
}

function readUser() {
    const user:object = Object(reqresUsers.getSingleUser(Number($("#read-user-id").val())))
    console.log(user)
    
    $("table tbody").empty()

    $("table tbody").append("<tr></tr>")
        for (let val of Object.values(user)) {
            $("table tbody tr:last").append(`<td>${val}</td>`)
    }
}