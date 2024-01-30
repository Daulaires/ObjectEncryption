const { CreateDM } = require('./../utils/DM.js');

module.exports={
    handleCreateDM:function(User, User2){
        CreateDM(User, User2);

        socket.emit('createDM', {user: User, user2: User2});
    },
}