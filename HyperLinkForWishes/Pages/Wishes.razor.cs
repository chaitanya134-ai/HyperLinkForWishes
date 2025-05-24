using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace HyperLinkForWishes.Pages
{
    public partial class Wishes : ComponentBase
    {
        [Inject] NavigationManager Navigation { get; set; }
        [Inject] IJSRuntime JS { get; set; }

        protected string Name = "Friend";

        protected override void OnInitialized()
        {
            var uri = new Uri(Navigation.Uri);
            var query = System.Web.HttpUtility.ParseQueryString(uri.Query);
            Name = query["name"] ?? "Deepika....!";
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                // Pass the name to the JavaScript function
                await JS.InvokeVoidAsync("startFireworks", Name);
            }
        }
    }
}