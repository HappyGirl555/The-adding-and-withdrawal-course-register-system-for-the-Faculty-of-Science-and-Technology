package th.ac.tu.cs.services.model;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import th.ac.tu.cs.services.repository.MyStudentRepository;


import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private MyStudentRepository student_repository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Searching for user: " + username);
        Optional <Student> user = student_repository.findByUsername(username);
        if(user.isPresent()){
            var studentObj = user.get();
            System.out.println("Username found!");
            return User.builder()
                    .username(studentObj.getUsername())
                    .password(studentObj.getPassword())
                    .build();
        }else{
            System.out.println("Username Not found!");
            throw new UsernameNotFoundException(username);
        }
    }
}


