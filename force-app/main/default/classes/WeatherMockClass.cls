@isTest
global class WeatherMockClass implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"data":[{"wind_cdir":"NE","rh":59,"pod":"d","lon":"-78.63861","pres":1006.6}]}');
        response.setStatusCode(200);
        return response; 
    }
}