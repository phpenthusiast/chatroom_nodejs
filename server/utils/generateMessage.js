const generateMessage = (to, from) => {
    return {
        to,
        from,
        createdAt: new Date().getTime() 
    }
}

module.exports = {generateMessage};
