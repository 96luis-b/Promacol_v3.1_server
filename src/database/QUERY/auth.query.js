const auth = {
    getUsers: `SELECT * FROM user`,
    checkDuplicateSession: `SELECT S.status FROM user U
        INNER JOIN session S ON S.user_id=U.user_id 
        WHERE U.username=? AND S.status=TRUE`,
    getUserById: `SELECT * FROM user WHERE user_id=?`,
    getUserByUsername: `SELECT * FROM user WHERE username=?`,
    getUserRole: `SELECT UR.role_id FROM user U
        INNER JOIN user_role UR ON UR.user_id=U.user_id
        WHERE U.user_id=? AND U.status=TRUE`,
    newSession: `INSERT INTO session(user_id, start_date, start_time, status) VALUES(?, ?, ?, TRUE)`,
    logout:`UPDATE session SET end_date=?, end_time=?, status=FALSE WHERE user_id=? AND status=TRUE`,
    checkUser: `SELECT UR.role_id FROM user U
    INNER JOIN user_role UR ON UR.user_id=U.user_id
    WHERE U.user_id=? AND UR.role_id=? AND U.status=TRUE`,
}

export default auth