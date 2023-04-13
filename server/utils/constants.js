

module.exports = {
    userTypes : {
        customer : "CUSTOMER",
        engineer : "ENGINEER",
        admin : "ADMIN"
    },
    userStatus : {
        pending : "PENDING",
        approved : "APPROVED",
        rejected : "REJECTED"
    },
    ticketStatus : {
        open : "OPEN",
        closed : "CLOSED",
        blocked : "BLOCKED",
        inProgress : "INPROGRESS"
    }
}

const errorCodes = {
    VALIDATION_ERROR : 400,
    UNAUTHORIZED : 401,
    FORBIDDEN :  403,
    NOT_FOUND : 404,
    SERVER_ERROR : 500
}
module.exports = {errorCodes}