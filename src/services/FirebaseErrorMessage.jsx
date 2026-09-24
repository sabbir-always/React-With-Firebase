export const firebaseErrorMessage = (code) => {
    switch (code) {
        case "auth/email-already-in-use": return "This email is already registered. Please sign in instead.";
        case "auth/invalid-email": return "Invalid email address.";
        case "auth/weak-password": return "Password is too weak.";
        case "auth/operation-not-allowed": return "Email/Password sign-in is not enabled in Firebase.";
        case "auth/network-request-failed": return "Network error. Check your internet connection.";
        case "auth/too-many-requests": return "Too many attempts. Please try again later.";
        case "permission-denied": return "Permission denied. Check Firestore rules.";
        default: return "Something went wrong. Please try again.";
    }
};