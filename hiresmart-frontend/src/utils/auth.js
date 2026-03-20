import { jwtDecode } from "jwt-decode";

export function getUserRole(){

 const token = localStorage.getItem("token")

 if(!token) return null

 const decoded = jwtDecode(token)

 return decoded.role

}

export function isRecruiter(){
 return getUserRole() === "ROLE_RECRUITER"
}

export function isCandidate(){
 return getUserRole() === "ROLE_CANDIDATE"
}