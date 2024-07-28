using AutoMapper;
using Domain.DTOs.BackgroundDTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Repository.Commons;
using Service.Interfaces;

namespace API.Controllers
{
    [Route("api/v1/backgrounds")]
    [ApiController]
    public class BackgroundController : Controller
    {
        private readonly IBackgroundItemService _backgroundService;
        private readonly IMapper _mapper;

        public BackgroundController(IBackgroundItemService backgroundService, IMapper mapper)
        {
            _backgroundService = backgroundService;
            _mapper = mapper;
        }

        /// <summary>
        /// Get list of backgrounds
        /// </summary>
        /// <returns>A list of backgrounds</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /backgrounds
        ///
        /// </remarks>
        /// <response code="200">Returns list of backgrounds</response>
        /// <response code="400">If the item is null</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetBackgroundsAsync()
        {
            try
            {
                var backgroundList = await _backgroundService.GetAllBackgroundsAsync();
                var backgroundResponseDTOs = _mapper.Map<List<BackgroundDTO>>(backgroundList);

                return Ok(ApiResult<List<BackgroundDTO>>.Succeed(backgroundResponseDTOs, "Get List Backgrounds Successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Get background by id
        /// </summary>
        /// <param name="id">Background ID</param>
        /// <returns>A background with specified ID</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /backgrounds/1
        ///
        /// </remarks>
        /// <response code="200">Returns a background</response>
        /// <response code="404">Background not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetBackgroundByIdAsync(int id)
        {
            try
            {
                var background = await _backgroundService.GetBackgroundByIdAsync(id);
                if (background == null)
                {
                    return NotFound(ApiResult<object>.Error(null, "Background not found"));
                }
                var backgroundResponseDTO = _mapper.Map<BackgroundDTO>(background);
                return Ok(ApiResult<BackgroundDTO>.Succeed(backgroundResponseDTO, "Get background successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Create a new background
        /// </summary>
        /// <param name="createBackgroundModel">Background creation model</param>
        /// <returns>A newly created background</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /backgrounds
        ///     {
        ///         "name": "New Background",
        ///         "description": "A new background description",
        ///         "backgroundUrl": "https://example.com/backgrounds/new-background.png",
        ///         "thumbnailUrl": "https://example.com/thumbnails/new-background.png",
        ///         "size": 4.5,
        ///         "price": 100,
        ///         "status": "ACTIVE"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">Returns the newly created background</response>
        /// <response code="400">If the creation model is invalid</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateBackgroundAsync([FromBody] CreateBackgroundDTO createBackgroundModel)
        {
            try
            {
                var background = new Background
                {
                    Name = createBackgroundModel.Name,
                    Description = createBackgroundModel.Description,
                    BackgroundUrl = createBackgroundModel.BackgroundUrl,
                    Size = createBackgroundModel.Size,
                    Price = createBackgroundModel.Price,
                    Status = createBackgroundModel.Status
                };

                var createdBackground = await _backgroundService.CreateBackgroundAsync(background);
                var backgroundResponseDTO = _mapper.Map<BackgroundDTO>(createdBackground);

                return Ok(ApiResult<BackgroundDTO>.Succeed(backgroundResponseDTO, "Create background successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Update an existing background
        /// </summary>
        /// <param name="id">The ID of the background to update</param>
        /// <param name="updateBackgroundModel">The updated background data</param>
        /// <returns>The updated background</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /backgrounds/1
        ///     {
        ///         "name": "Updated Background",
        ///         "description": "Updated background description",
        ///         "backgroundUrl": "https://example.com/backgrounds/updated-background.png",
        ///         "thumbnailUrl": "https://example.com/thumbnails/updated-background.png",
        ///         "size": 5.0,
        ///         "price": 120,
        ///         "status": "ACTIVE"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">Returns the updated background</response>
        /// <response code="400">If the update model is invalid</response>
        /// <response code="404">If the background is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateBackgroundAsync(int id, [FromBody] CreateBackgroundDTO updateBackgroundModel)
        {
            try
            {
                var background = new Background
                {
                    Id = id,
                    Name = updateBackgroundModel.Name,
                    Description = updateBackgroundModel.Description,
                    BackgroundUrl = updateBackgroundModel.BackgroundUrl,
                    Size = updateBackgroundModel.Size,
                    Price = updateBackgroundModel.Price,
                    Status = updateBackgroundModel.Status
                };

                var updatedBackground = await _backgroundService.UpdateBackgroundAsync(background);
                var backgroundResponseDTO = _mapper.Map<BackgroundDTO>(updatedBackground);

                return Ok(ApiResult<BackgroundDTO>.Succeed(backgroundResponseDTO, "Update background successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Delete an existing background
        /// </summary>
        /// <param name="id">The ID of the background to delete</param>
        /// <returns>The deleted background</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /backgrounds/1
        ///
        /// </remarks>
        /// <response code="200">Returns the deleted background</response>
        /// <response code="400">If the background item is invalid</response>
        /// <response code="404">If the background item is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteBackgroundAsync(int id)
        {
            try
            {
                await _backgroundService.DeleteBackgroundAsync(id);
                return Ok(ApiResult<object>.Succeed(null, "Delete background successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }
    }
}
