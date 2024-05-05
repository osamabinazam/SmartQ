





const checkRole = (userRole) => {
    if (userRole === 'vendor') {
        return true
    } else if (userRole === 'customer') {
        return false
    }
    
}

export default checkRole;
