﻿using Domain.Entities;

namespace Repository.Interfaces;
public interface IAuthRepository
{
    Task<bool> CreateUser(User user);

    Task<bool> UpdateRefreshToken(int user, string refreshToken);
    
    Task<User> GetRefreshToken(string refreshToken);
    
    Task<bool> DeleteRefreshToken(int userId);

}