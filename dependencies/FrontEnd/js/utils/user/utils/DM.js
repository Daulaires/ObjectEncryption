module.exports = {
    CreateDM: function (user1, user2) {
        // Check if DM between user1 and user2 already exists
        if (!user1.DMs.has(user2.name)) {
            // If not, create an empty array for user2 in user1's DMs
            user1.DMs.set(user2.name, []);
        }

        if (!user2.DMs.has(user1.name)) {
            // If not, create an empty array for user1 in user2's DMs
            user2.DMs.set(user1.name, []);
        }

        // if already exists then return the DM
        if (user1.DMs.has(user2.name) && user2.DMs.has(user1.name)) {
            // Return the DM array for user1 and user2
            return user1.DMs.get(user2.name);
        }
        
        // Add user1 to user2's DMs and user2 to user1's DMs if they don't exist
        user1.DMs.set(user2.name, []);
        user2.DMs.set(user1.name, []);

        const DM = {
            user1: user1,
            user2: user2,
        };
        // Return the DM array for user1 and user2
        return DM;
    }
}
