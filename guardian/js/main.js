/*
 * Code for the tabbed component, using the revealing module pattern
 */

 var tabbed = (function($) {
 	
 	if (typeof jQuery === 'undefined') { throw new Error('Tabbed component requires jQuery'); }
 	
 	var apiUrl,
 	    endpoints,
 	    apiKey,
 	    datas,
         
 	    config,
 	    iterateNews,
 	    callApi;
    /*
     * This method configures the module with the
     * information about the api url and endpoints 
     * and initialises the call to the api.
     */

    config = function(obj) {
      apiUrl = obj.url;
      endpoints = obj.endpoints;
      apiKey = obj.apiKey;
      callApi(); 
    };

    /*
     * This method calls the api with the parameters set by
     * the config method.
     */   

    callApi = function() {
      var calls = [];
      for(var i = 0; i < endpoints.length; i++) {
      	   var call = $.ajax(apiUrl + endpoints[i] + apiKey);
      	   calls.push(call);    	   
          }

      $.when.apply(null, calls).then(function() {
      	var data = arguments;
      	iterateNews(data);
      }
        
      );
      
    };

    /*
     * This method takes as a parameter all the data fetched by the
     * ajax call and iterates over the html elements to display it.
     */ 
    
    iterateNews = function(data) {
      var labels = $('label'),
      	  lists = $('ol');
      labels.each(function(index) {
        $(this).append(data[index][0].response.edition.webTitle);
      });

      lists.each(function(index) {
        var results = data[index][0].response.results;
        for(var j = 0; j < results.length; j++) {
          var a = $('<a></a>').attr('href',results[j].webUrl).text(results[j].webTitle),
          	  li = $('<li></li>').append(a);
          $(this).append(li);
        }
      });
    };

 	return {
 	  config: config
 	}
 })(jQuery);


 tabbed.config({
 	url: 'http://content.guardianapis.com/',
 	endpoints: ['uk-news','football','travel'],
 	apiKey: '?api-key=test'
 });