using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly BlogItemService _data;
        public BlogController(BlogItemService dataFromService)
        {
            _data = dataFromService;
        }

        [HttpPost("AddBlogItems")]
        public bool AddBlogItems(BlogItemModel newBlogItem)
        {
            return _data.AddBlogItems(newBlogItem);
        }

        //GetAllBlogItems
        [HttpGet("GetBlogItem")]
        public IEnumerable<BlogItemModel> GetAllBlogItems()
        {
            return _data.GetAllBlogItems();
        }

        //GetBlogItemsByCategory
        [HttpGet("GetBlogItemByCategory/{Category}")]
        public IEnumerable<BlogItemModel> GetItemByCategory(string Category)
        {
            return _data.GetItemByCategory(Category);
        }

        // GetItemsByTags
        [HttpGet("GetItemsByTag/{Tag}")]
        public List<BlogItemModel> GetItemsByTag(string Tag)
        {
            return _data.GetItemsByTag(Tag);
        }

        //GetBlogItemsByDate
        [HttpGet("GetItemsByDate/{Date}")]
        public IEnumerable<BlogItemModel> GetItemsByDate(string Date)
        {
            return _data.GetItemsByDate(Date);
        }

        //UpdateBlogItems
        [HttpPost("UpdateBlogItems")]
        public bool UpdateBlogItems(BlogItemModel BlogUpdate)
        {
            return _data.UpdateBlogItems(BlogUpdate);
        }

        //DeleteBlogItem
        [HttpPost("DeleteBlogItem/{BlogDelete}")]
        public bool DeleteBlogItem(BlogItemModel BlogDelete)
        {
            return _data.DeleteBlogItem(BlogDelete);
        }

        //Get published Blog items
        [HttpGet("GetPublishedItems")]
        public IEnumerable<BlogItemModel> GetPublishedItems() 
        {
            return _data.GetPublishedItems();
        }
    }
}