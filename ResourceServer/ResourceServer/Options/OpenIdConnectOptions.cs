namespace ResourceServer.Options
{
    public class OpenIdConnectOptions
    {
        public const string Key = "OpenIdConnect";

        public string Authority { get; set; }

        public string ClientId { get; set; }

        public string Secret { get; set; }
    }
}