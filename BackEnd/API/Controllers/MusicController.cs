using AutoMapper;
using Domain.DTOs.MusicsDTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Repository.Commons;
using Service.Interfaces;

namespace API.Controllers
{
    [Route("api/v1/music")]
    [ApiController]
    public class MusicController : Controller
    {
        private readonly IMusicService _musicService;
        private readonly IMapper _mapper;

        public MusicController(IMusicService musicService, IMapper mapper)
        {
            _musicService = musicService;
            _mapper = mapper;
        }

        /// <summary>
        /// Get list of music
        /// </summary>
        /// <returns>A list of music items</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /music
        ///
        /// </remarks>
        /// <response code="200">Returns list of music items</response>
        /// <response code="400">If the item is null</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetMusicAsync()
        {
            try
            {
                var musicList = await _musicService.GetAllMusicAsync();
                var musicResponseDTOs = _mapper.Map<List<MusicDTO>>(musicList);

                return Ok(ApiResult<List<MusicDTO>>.Succeed(musicResponseDTOs, "Get List Music Successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Get music by id
        /// </summary>
        /// <param name="id">Music ID</param>
        /// <returns>A music item with specified ID</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /music/1
        ///
        /// </remarks>
        /// <response code="200">Returns a music item</response>
        /// <response code="404">Music item not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetMusicByIdAsync(int id)
        {
            try
            {
                var music = await _musicService.GetMusicByIdAsync(id);
                if (music == null)
                {
                    return NotFound(ApiResult<object>.Error(null, "Music not found"));
                }
                var musicResponseDTO = _mapper.Map<MusicDTO>(music);
                return Ok(ApiResult<MusicDTO>.Succeed(musicResponseDTO, "Get music successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Create a new music item
        /// </summary>
        /// <param name="createMusicModel">Music creation model</param>
        /// <returns>A newly created music item</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /music
        ///     {
        ///         "name": "New Song",
        ///         "description": "A new song description",
        ///         "musicUrl": "https://example.com/music/new-song.mp3",
        ///         "thumbnailUrl": "https://example.com/thumbnails/new-song.png",
        ///         "size": 4.5,
        ///         "duration": 180,
        ///         "price": 0,
        ///         "status": "ACTIVE"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">Returns the newly created music item</response>
        /// <response code="400">If the creation model is invalid</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateMusicAsync([FromBody] CreateMusicDTO createMusicModel)
        {
            try
            {
                string imageUrl = null;

                var music = new Music
                {
                    Name = createMusicModel.Name,
                    Description = createMusicModel.Description,
                    MusicUrl = createMusicModel.MusicUrl,
                    ThumbnailUrl = imageUrl,
                    Size = createMusicModel.Size,
                    Duration = createMusicModel.Duration,
                    Price = createMusicModel.Price,
                    Status = createMusicModel.Status
                };

                var createdMusic = await _musicService.CreateMusicAsync(music);
                var musicResponseDTO = _mapper.Map<MusicDTO>(createdMusic);

                return Ok(ApiResult<MusicDTO>.Succeed(musicResponseDTO, "Create music successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Update an existing music item
        /// </summary>
        /// <param name="id">The ID of the music item to update</param>
        /// <param name="updateMusicModel">The updated music data</param>
        /// <returns>The updated music item</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /music/1
        ///     {
        ///         "name": "Updated Song",
        ///         "description": "Updated song description",
        ///         "musicUrl": "https://example.com/music/updated-song.mp3",
        ///         "thumbnailUrl": "https://example.com/thumbnails/updated-song.png",
        ///         "size": 5.0,
        ///         "duration": 200,
        ///         "price": 10,
        ///         "status": "ACTIVE"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">Returns the updated music item</response>
        /// <response code="400">If the update model is invalid</response>
        /// <response code="404">If the music item is not found</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateMusicAsync(int id, [FromBody] CreateMusicDTO updateMusicModel)
        {
            try
            {
                string imageUrl = null;

                var music = new Music
                {
                    Id = id,
                    Name = updateMusicModel.Name,
                    Description = updateMusicModel.Description,
                    MusicUrl = updateMusicModel.MusicUrl,
                    ThumbnailUrl = imageUrl,
                    Size = updateMusicModel.Size,
                    Duration = updateMusicModel.Duration,
                    Price = updateMusicModel.Price,
                    Status = updateMusicModel.Status
                };

                var updatedMusic = await _musicService.UpdateMusicAsync(music);
                var musicResponseDTO = _mapper.Map<MusicDTO>(updatedMusic);

                return Ok(ApiResult<MusicDTO>.Succeed(musicResponseDTO, "Update music successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }

        /// <summary>
        /// Delete an existing music item
        /// </summary>
        /// <param name="id">The ID of the music item to delete</param>
        /// <returns>The deleted music item</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /music/1
        ///
        /// </remarks>
        /// <response code="200">Returns the deleted music item</response>
        /// <response code="400">If the music item is invalid</response>
        /// <response code="404">If the music item is not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteMusicAsync(int id)
        {
            try
            {
                await _musicService.DeleteMusicAsync(id);
                return Ok(ApiResult<MusicDTO>.Succeed(null, "Delete music successfully!"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResult<object>.Fail(ex));
            }
        }
    }
}