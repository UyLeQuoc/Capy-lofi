using Domain.Entities;
using System.Linq.Expressions;

namespace Repository.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    Task<List<TEntity>> GetAllAsync(params Expression<Func<TEntity, object>>[] includes);

    Task<TEntity?> GetByIdAsync(int id, params Expression<Func<TEntity, object>>[] includes);

    Task<TEntity> AddAsync(TEntity entity);

    Task<bool> UpdateRange(List<TEntity> entities);

    Task<bool> Update(TEntity entity);

    Task<bool> SoftRemoveRangeById(List<int> entitiesId);

    Task<bool> SoftRemoveRange(List<TEntity> entities);

    Task<bool> SoftRemove(TEntity entity);
    Task AddRangeAsync(List<TEntity> entities);

    IQueryable<TEntity> GetQueryable();


}