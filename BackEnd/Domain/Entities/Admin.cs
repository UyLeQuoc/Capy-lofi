﻿namespace Domain.Entities;

public class Admin : BaseEntity
{
    public string Email { get; set; }
    public string Password { get; set; }
}