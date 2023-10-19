package br.com.sacfullnet.sacfullnet.service;

import java.util.List;

import br.com.sacfullnet.sacfullnet.model.User;

public interface UserService {
    List<User> find();

    List<User> search(String search);

    int save(User user);

    boolean update(User user);

    boolean delete(Integer id);

    User authenticate(String username, String password);

    
}
