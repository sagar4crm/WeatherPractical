import { LightningElement, track, wire } from 'lwc';
import weather from '@salesforce/resourceUrl/weather';
import resourceContainer from '@salesforce/resourceUrl/Resources';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import performCallout from '@salesforce/apex/WeatherAPI.performCallout';
 
export default class Weather extends LightningElement {
    @track lat;
    @track long;
 
    @track mapMarkers = [];
    zoomLevel = 10;
    @track result;
    @track value;
    
    /* generate the URL for the JavaScript, CSS and image file */
    jqueryJS = resourceContainer + '/js/jquery-2.1.4.min.js';
    skyJS = resourceContainer + '/js/skycons.js';
    styleCss = resourceContainer + '/css/style.css';
    
    renderedCallback() {
        /*eslint-disable */
        Promise.all([
            loadScript(this,this.jqueryJS),
            loadScript(this,this.skyJS),
            loadStyle(this, this.styleCss)
        ]).then(() =>
        {
            console.log('loaded');
        })
        
    }
        
    connectedCallback() {
        performCallout({location: 'Dubai'}).then(data => {
            this.mapMarkers = [{
                location: {
                    Latitude: data['cityLat'],
                    Longitude: data['cityLong']
                },
                title: data['cityName'] + ', ' + data['state'],
            }];
            this.result = data;
        }).catch(err => console.log(err));
        loadStyle(this, weather).then(result => {
            console.log('what is the result?' , result);
        });
    }
 
    get getCityName() {
        if (this.result) {
            return this.result.cityName;
        } else {
            return '---'
        }
    }

    get getCityDateTime() {
        if (this.result) {
        var m_names = ["January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December"];

        var d_names = ["Sunday","Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"];

        var myDate = new Date();
        var curr_date = myDate.getDate();
        var curr_month = myDate.getMonth();
        var curr_day  = myDate.getDay();
        var datetoday = d_names[curr_day] + ", " + m_names[curr_month] + " " +curr_date;
            return datetoday;
        } else {
            return '---'
        }
    }
 
    get getConvertedTemp() {
        if (this.result) {
            return Math.round((this.result.cityTemp * (9/5)) + 32) + ' deg';
        } else {
            return '--'
        }
    }
 
    get getCurrentWindSpeed() {
        if (this.result) {
            return this.result.cityWindSpeed + ' mph';
        } else {
            return '--'
        }
    }
 
    get getCurrentPrecip() {
        if (this.result) {
            return this.result.cityPrecip + " inches"
        } else {
            return '--'
        }
    }
 
    get options() {
        return [
            { label: 'Dubai', value: 'Dubai' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Canada', value: 'Canada' },
            { label: 'Raleigh, NC', value: 'Raleigh,NC' }
        ];
    }
 
    handleChange(event) {
        this.value = event.detail.value;
        performCallout({location: this.value}).then(data => {
            this.mapMarkers = [{
                location: {
                    Latitude: data['cityLat'],
                    Longitude: data['cityLong']
                },
                title: data['cityName'] + ', ' + data['state'],
            }];
            this.result = data;
        }).catch(err => console.log(err));
    }
}