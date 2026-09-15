using KTC.BLL.Dto.CreditCard;
using KTC.BLL.Services.CreditCard;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/credit-card")]
    public class CreditCardController : ControllerBase
    {
        private readonly ICreditCardService _creditCardService;
        public CreditCardController(ICreditCardService creditCardService)
        {
            _creditCardService = creditCardService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCreditCard([FromBody] CreateCreditCardDto commentDto)
        {
            var response = await _creditCardService.CreateAsync(commentDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteCreditCard([FromQuery] string id)
        {
            var response = await _creditCardService.DeleteAsync(id);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCreditCards()
        {
            var response = await _creditCardService.GetAllCreidtCards();
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetCreditCard([FromQuery] string id)
        {
            var response = await _creditCardService.GetByIdAsync(id);
            return this.ToActionResult(response);
        }
        [HttpGet("by-user-id")]
        public async Task<IActionResult> GetCreditCardsByUserId([FromQuery] string userId)
        {
            var response = await _creditCardService.GetByUserID(userId);
            return this.ToActionResult(response);
        }
    }
}
