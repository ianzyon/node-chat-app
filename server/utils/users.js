
// addUser (id, name, room)
// remUser (id)
// getUser(id)
//getUserList(room)

// class syntax

class Users {

    constructor () {
        this.users=[];
    }

    addUser (id,name,room) {
        let user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user; 
    }

    removeUser (id) {
        var user = this.getUser(id);

        if (user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
      
        return user;
    }
    getUser (id) {
        return this.users.filter((user)=> user.id === id)[0]

    }
    getUsersList (room){
        var users = this.users.filter((user)=> {
            return user.room === room;
        });
        var namesArray = users.map( (user)=>{
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {
    Users
};