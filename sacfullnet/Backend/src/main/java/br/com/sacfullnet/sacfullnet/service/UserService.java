package br.com.sacfullnet.sacfullnet.service;

import java.util.List;

import br.com.sacfullnet.sacfullnet.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    List<User> find();

    List<User> search(String search);

    UserDetails findByLogin(String login);

    int save(User user);

    boolean update(User user);

    boolean delete(Integer id);

    User authenticate(String username, String password);

    
}
