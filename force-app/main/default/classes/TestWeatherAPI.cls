@isTest
public with sharing class TestWeatherAPI {
    @isTest static void testPostCallout() {
        Test.setMock(HttpCalloutMock.class, new WeatherMockClass()); 
        WeatherAPI.WeatherData data = WeatherAPI.performCallout('dubai');
        
    }
}
