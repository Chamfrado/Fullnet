package br.com.sacfullnet.sacfullnet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import br.com.sacfullnet.sacfullnet.repository.dao.UserDao;
import br.com.sacfullnet.sacfullnet.service.UserService;
import br.com.sacfullnet.sacfullnet.model.User;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserDao userDao;

    @Override
    public List<User> find(){ return userDao.find(); }
    @Override
    public List<User> search(String search){
        return userDao.search(search);
    }

    @Override
    public UserDetails findByLogin(String login) {
        return userDao.findByLogin(login);
    }

    @Override
    public int save(User user){
        return userDao.save(user);
    }

    @Override
    public boolean update(User user){
        return userDao.update(user);
    }

    @Override
    public boolean delete(Integer id){
        return userDao.delete(id);
    }

    @Override
    public User authenticate(String username, String password ){
        return userDao.authenticate(username, password);
    }
    
}
