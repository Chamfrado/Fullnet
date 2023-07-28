package br.com.sacfullnet.sacfullnet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<User> find(){
        return userDao.find();
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
    
}
