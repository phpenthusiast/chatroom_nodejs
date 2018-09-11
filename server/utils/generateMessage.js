const generateMessage = (to, from, message) => {
    return {
        to,
        from,
        message,
        createdAt: new Date().getTime() 
    }
}

module.exports = {generateMessage};
