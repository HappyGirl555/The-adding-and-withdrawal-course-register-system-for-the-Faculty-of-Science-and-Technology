package th.ac.tu.cs.services.controller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller
public class WebController {



    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }

    @GetMapping("/register")
    public String registerPage(){
        return "register";
    }

    @GetMapping("/request")
    public String requestPage(){
        return "request";
    }

    @GetMapping("/student/signup")
    public String signupPage(){
        return "sign_up";
    }

}

