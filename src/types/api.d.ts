declare module "@/api" {
    interface QuickActionResponse {
        text: string;
        imgUrl: string;
        external?: boolean;
        link?: string
    }
    namespace server {
        function getQuickActionRecommend(category: string): Promise<QuickActionResponse>;
        function fetchSearchScreenData(category: string): Promise<any>;
        function getSearchRecommend(category: string): Promise<any>;
        function getSearchStyle(category: string): Promise<any>;
        function getSearchAdv(category: string): Promise<any>;
    }
    export default server
}