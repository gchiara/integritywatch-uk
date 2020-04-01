//import jquery from 'jquery';
//window.jQuery = jquery;
//window.$ = jquery;
//var jQuery = jquery;

const jquery = require('jquery')
$ = window.$ = window.jQuery = jquery;

require('jquery-ui-bundle')
require('jquery-ui-bundle/jquery-ui.css')
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore from 'underscore';
window.underscore = underscore;
window._ = underscore;

import '../public/vendor/js/popper.min.js'
import '../public/vendor/js/bootstrap.min.js'
import { csv } from 'd3-request'
import { json } from 'd3-request'

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';

//import 'jquery-ui-bundle';
//import 'jquery-ui-bundle/jquery-ui.css';


// Data object - is also used by Vue

var vuedata = {
  page: 'tabA',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  travelFilter: 'all',
  charts: {
    level: {
      title: 'MINISTERIAL LEVEL',
      info: 'This pie chart shows the proportion of meetings hosted by the level of Ministerial office. Click on the pie chart to filter the rest of the tool by the level of Ministerial office.'
    },
    department: {
      title: 'DEPARTMENT',
      info: 'Filter by department.'
    },
    hosts: {
      title: 'TOP 10 HOSTS',
      info: 'This bar chart shows the Ministers who have had the most contact with lobby organisations. When Ministers meet several lobby organisations in a single meeting, the tool counts each contact separately. The number of contacts can therefore be higher than the number of meetings. Click on the bar chart to filter the rest of the tool by Minister.'
    },
    organizations: {
      title: 'TOP 10 ORGANISATIONS',
      info: 'This bar chart shows the lobby organisations who have had the most contact with Ministers. When Ministers meet several lobby organisations in a single meeting, the tool counts each contact separately. The number of contacts can therefore be higher than the number of meetings. Click on the bar chart to filter the rest of the tool by lobby organisation.'
    },
    subject: {
      title: 'Subjects of lobby meetings',
      info: 'This word cloud provides an overview of the most common terms that appear in the subject of meetings between lobby organisations and Ministers. The more meetings on a given subject the bigger it appears in the word cloud.'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Table',
      info: ''
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  colors: {
    //generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    generic: ["#981b48", "#b7255a", "#d73771", "#ec5189", "#ec7ca6"],
    //default: "#2180c2",
    default: "#d73771",
    default1: "#f9b41b",
    colorSchemeCloud: ["#981b48", "#b7255a", "#d73771", "#ec5189", "#ec7ca6", "#f9b41b", "#e77a31", "#ffc138"]
    //colorSchemeCloud: [ "#4d9e9c", "#62aad9", "#3b95d0", "#42b983", "#449188", "#52c993", "#b7bebf", "#99b6c0" ]
  }
}



//Set vue components and Vue app

Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Share
    downloadDataset: function () {
      window.open('./data/iw_uk.csv');
    },
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Share text here ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = 'https://openaccess.transparency.org.uk/';
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})

//Charts
var charts = {
  level: {
    chart: dc.pieChart("#level_chart"),
    type: 'pie',
    divId: 'level_chart'
  },
  department: {
    chart: dc.rowChart("#department_chart"),
    type: 'row',
    divId: 'department_chart'
  },
  hosts: {
    chart: dc.rowChart("#hosts_chart"),
    type: 'row',
    divId: 'hosts_chart'
  },
  organizations: {
    chart: dc.rowChart("#organizations_chart"),
    type: 'row',
    divId: 'organizations_chart'
  },
  subject: {
    chart: dc.wordCloud("#wordcloud_chart"),
    type: 'cloud',
    divId: 'wordcloud_chart'
  },
  mainTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
  }
}

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcWidthWordcloud = function() {
  //Replace element if with wordcloud column id
  var width = document.getElementById("wordcloud_chart_col").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  }
  if(newWidth < 300) { 
    sizes.height = newWidth + 170;
    sizes.radius = (newWidth)/2;
    sizes.innerRadius = (newWidth)/4;
    sizes.cy = (newWidth)/2;
    sizes.legendY = (newWidth) + 30;
  } else {
    sizes.height = newWidth*0.75 + 170;
    sizes.radius = (newWidth*0.75)/2;
    sizes.innerRadius = (newWidth*0.75)/4;
    sizes.cy = (newWidth*0.75)/2;
    sizes.legendY = (newWidth*0.75) + 30;
  }
  return sizes;
};
var resizeGraphs = function() {
  for (var c in charts) {
    if((c == 'subject') && vuedata.showAllCharts == false){
    } else {
      var sizes = calcPieSize(charts[c].divId);
      var newWidth = recalcWidth(charts[c].divId);
      var charsLength = recalcCharsLength(newWidth);
      if(charts[c].type == 'row'){
        charts[c].chart.width(newWidth);
        charts[c].chart.label(function (d) {
          var thisKey = d.key;
          if(thisKey.indexOf('###') > -1){
            thisKey = thisKey.split('###')[0];
          }
          if(thisKey.length > charsLength){
            return thisKey.substring(0,charsLength) + '...';
          }
          return thisKey;
        })
        charts[c].chart.redraw();
      } else if(charts[c].type == 'bar') {
        charts[c].chart.width(newWidth);
        charts[c].chart.rescale();
        charts[c].chart.redraw();
      } else if(charts[c].type == 'pie') {
        charts[c].chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > charsLength){
              return thisKey.substring(0, charsLength) + '...';
            }
            return thisKey;
          }));
        charts[c].chart.redraw();
      } else if(charts[c].type == 'cloud') {
        charts[c].chart.size(recalcWidthWordcloud());
        charts[c].chart.redraw();
      }
    }
  }
};

//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}
//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if(date.indexOf("Cancelled") > -1){
      date = date.split(" ")[0];
    }
      return dmy(date);
  },
  "date-eu-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
var lobbyist_typeList = {}
csv('./data/iw_uk.csv?' + randomPar, (err, events) => {
  var parseDate = d3.timeParse("%d/%m/%Y");
  var now = Date.now();
  var RecordId = 0;
  //Loop through data to aply fixes and calculations
  _.each(events, function (d) {
    if(!d.purpose){
      d.purpose = "";
    }
    d.RecordId = RecordId;
    d.date1 = d.date;
    if(d.date != ""){
      d.date = parseDate(d.date);
    }
    d.policy_level = d.policy_level.trim();
    d.portfolio = '';
    d.ministerialLevel = "Others";
    switch(d.policy_level) {
      case 'Prime Minister':
        d.ministerialLevel = 'Prime Minister';
        break;
      case 'Chancellor of the Exchequer':
        d.ministerialLevel = 'Chancellor of the Exchequer';
        break;
      case 'Secretary of State':
        d.ministerialLevel = 'Secretary of State';
        break;
      case 'Minister of State':
        d.ministerialLevel = 'Minister of State';
        break;
      case 'Parliamentary Under-Secretary':
        d.ministerialLevel = 'Parliamentary Under-Secretary';
        break;
      default:
        d.ministerialLevel = "Others";
    };
    RecordId ++;
  });

  //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
  var ndx = crossfilter(events);
  var searchDimension = ndx.dimension(function (d) {
    var entryString = d.rep_new + " " + d.organisation + " " + d.purpose + " ";
    return entryString.toLowerCase();
  });
  var dateEvent = ndx.dimension(function(d) {
		if(!d.date){
			return "";
		}
		return d.date;
	});

  //CHART 1
  var createLevelChart = function() {
    var order = ['Prime Minister', 'Chancellor of the Exchequer', 'Secretary of State', 'Minister of State', 'Parliamentary Under-Secretary', 'Others']
    var chart = charts.level.chart;
    var dimension = ndx.dimension(function (d) {
      return d.ministerialLevel;
    });
    var group = dimension.group().reduceSum(function (d) { return 1; });
    var sizes = calcPieSize(charts.level.divId);
    chart
      .width(sizes.width)
      .height(sizes.height)
      .cy(sizes.cy)
      .innerRadius(sizes.innerRadius)
      .radius(sizes.radius)
      .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
        var thisKey = d.name;
        if(thisKey.length > 40){
          return thisKey.substring(0,40) + '...';
        }
        return thisKey;
      }))
      .title(function(d){
        var thisKey = d.key;
        return thisKey + ': ' + d.value;
      })
      .dimension(dimension)
      .ordering(function(d) { return order.indexOf(d.key)})
      .ordinalColors(["#981b48", "#b7255a", "#d73771", "#ec5189", "#ec7ca6", "#ccc"])
      /*
      .colorCalculator(function(d, i) {
        return vuedata.colors.institutionsTypes[d.key];
      })
      */
      .group(group);

    chart.render();
  }

  //CHART 2
  var createDepartmentChart = function() {
    var chart = charts.department.chart;
    var dimension = ndx.dimension(function (d) {
      return d.department; 
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var width = recalcWidth(charts.department.divId);
    var charsLength = recalcCharsLength(width);
    chart
      .width(width)
      .height(420)
      .cap(10)
      .margins({top: 0, left: 0, right: 0, bottom: 20})
      .group(group)
      .dimension(dimension)
      .colorCalculator(function(d, i) {
        return vuedata.colors.default;
      })
      .label(function (d) {
        if(d.key && d.key.length > charsLength){
          return d.key.substring(0,charsLength) + '...';
        }
        return d.key;
      })
      .title(function (d) {
          return d.key + ': ' + d.value;
      })
      .elasticX(true)
      .xAxis().ticks(4);
      //chart.xAxis().tickFormat(numberFormat);
      chart.render();
  }

  //CHART 3
  var createHostsChart = function() {
    var chart = charts.hosts.chart;
    var dimension = ndx.dimension(function (d) {
      return d.rep_new;;
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var filteredGroup = (function(source_group) {
      return {
        all: function() {
          return source_group.top(10).filter(function(d) {
            return (d.value != 0);
          });
        }
      };
    })(group);
    var width = recalcWidth(charts.hosts.divId);
    var charsLength = recalcCharsLength(width);
    
    chart
      .width(width)
      .height(560)
      .margins({top: 0, left: 0, right: 0, bottom: 20})
      .group(filteredGroup)
      .dimension(dimension)
      .colorCalculator(function(d, i) {
        return vuedata.colors.default;
      })
      .label(function (d) {
          if(d.key && d.key.length > charsLength){
            return d.key.substring(0,charsLength) + '...';
          }
          return d.key;
      })
      .title(function (d) {
          return d.key + ': ' + d.value;
      })
      .elasticX(true)
      .xAxis().ticks(4);
      //chart.xAxis().tickFormat(numberFormat);
      chart.render();
  }

  //CHART 4
  var createOrganizationsChart = function() {
    var chart = charts.organizations.chart;
    var dimension = ndx.dimension(function (d) {
      return d.organisation;
    });
    var group = dimension.group().reduceSum(function (d) {
        return 1;
    });
    var filteredGroup = (function(source_group) {
      return {
        all: function() {
          return source_group.top(10).filter(function(d) {
            return (d.value != 0);
          });
        }
      };
    })(group);
    var width = recalcWidth(charts.organizations.divId);
    var charsLength = recalcCharsLength(width);
    
    chart
      .width(width)
      .height(530)
      .margins({top: 0, left: 0, right: 0, bottom: 20})
      .group(filteredGroup)
      .dimension(dimension)
      .colorCalculator(function(d, i) {
        return vuedata.colors.default1;
      })
      .label(function (d) {
          if(d.key && d.key.length > charsLength){
            return d.key.substring(0,charsLength) + '...';
          }
          return d.key;
      })
      .title(function (d) {
          return d.key + ': ' + d.value;
      })
      .elasticX(true)
      .xAxis().ticks(4);
      //chart.xAxis().tickFormat(numberFormat);
      chart.render();
  }

  //CHART 5
  var createWordcloudChart = function() {
    var chart = charts.subject.chart;
    var dimension = ndx.dimension(function(d) {
      return d.purpose || "";
    })
    var group = dimension.group().reduceSum(function(d) { return 1; });
    chart
    .dimension(dimension)
    .group(group)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .maxWords(70)
    .timeInterval(10)
    .duration(200)
    .ordinalColors(vuedata.colors.colorSchemeCloud)
    .size(recalcWidthWordcloud())
    .font("Impact")
    .stopWords (/^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|la|du|mr|commissioner|et|des|dg|commission|de|pour|en|les|le|meeting|eu|new|priorities|presentation|preparation|issues|meetings|representatives|work|implementation|general|future|challenge|challenge|skey|role|exchange|views|discuss|discussion|various director|talks|position|global|field|level|initiative|company|state|aspects|context|current|change|european|potential|including|dans|within|developments|play|present|Päris|Enegry|deep|Susan|Danger|Managing|Director|AmCham|Karl|Cox|Vice|President|Oracle| Bert|Boers|SAS|Marco|Comastri|EMEA|CA|Patrick|Deconinck|Senior|Western|3M|Harry|van| Dorenmalen|Chairman|IBM|Aongus|Hegarty|Dell|Cindy|Miller|UPS|Christian|Morales|Manager|Intel| |Julián|Nebreda|AES|Peter|Ryan|VP|HP|Nigel|Lewis|Caterpillar|Dirk|Ostijn|Head|&| Chief|Executive |Officer|MetLife|CA|flagship|related|portfolio|Cssr|Jourova|(| voting|all|expats|as|part|)|,|Year)$/)
    .onClick(function(d){setword(d.key);})
    .textAccessor(function(d) {return d.purpose;});
    chart.size(recalcWidthWordcloud());
    chart.render();
  }
  
  
  //TABLE
  var createTable = function() {
    var count=0;
    charts.mainTable.chart = $("#dc-data-table").dataTable({
      "columnDefs": [
        {
          "searchable": false,
          "orderable": false,
          "targets": 0,   
          data: function ( row, type, val, meta ) {
            return count;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 1,
          "defaultContent":"N/A",
          "data": function(d) {
            //id,function,party,institution,date,contact_type,org_name,lobbyist_type,purpose,purpose_details
            return d.rep_new;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 2,
          "defaultContent":"N/A",
          "data": function(d) {
            return d.policy_level;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 3,
          "defaultContent":"N/A",
          "data": function(d) {
            return d.department;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 4,
          "defaultContent":"N/A",
          "data": function(d) {
            return d.purpose;;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 5,
          "defaultContent":"N/A",
          "data": function(d) {
            return d.organisation;
          }
        },
        {
          "searchable": false,
          "orderable": true,
          "targets": 6,
          "defaultContent":"N/A",
          "type":"date-eu",
          "data": function(d) {
            if (!d.date) {
              return d.date1;
            }
					  return d.date.getDate()+"/"+(1+d.date.getMonth())+"/"+d.date.getFullYear();
          }
        }
      ],
      "iDisplayLength" : 25,
      "bPaginate": true,
      "bLengthChange": true,
      "bFilter": false,
      "order": [[ 6, "desc" ]],
      "bSort": true,
      "bInfo": true,
      "bAutoWidth": false,
      "bDeferRender": true,
      "aaData": searchDimension.top(Infinity),
      "bDestroy": true,
    });
    var datatable = charts.mainTable.chart;
    datatable.on( 'draw.dt', function () {
      var PageInfo = $('#dc-data-table').DataTable().page.info();
        datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
      });
      datatable.DataTable().draw();

    $('#dc-data-table tbody').on('click', 'tr', function () {
      var data = datatable.DataTable().row( this ).data();
      vuedata.selectedElement = data;
      $('#detailsModal').modal();
    });
  }
  //REFRESH TABLE
  function RefreshTable() {
    dc.events.trigger(function () {
      var alldata = searchDimension.top(Infinity);
      charts.mainTable.chart.fnClearTable();
      charts.mainTable.chart.fnAddData(alldata);
      charts.mainTable.chart.fnDraw();
    });
  }

  //SEARCH INPUT FUNCTIONALITY
  var typingTimer;
  var doneTypingInterval = 1000;
  var $input = $("#search-input");
  $input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });
  $input.on('keydown', function () {
    clearTimeout(typingTimer);
  });
  function doneTyping () {
    var s = $input.val().toLowerCase();
    searchDimension.filter(function(d) { 
      return d.indexOf(s) !== -1;
    });
    throttle();
    var throttleTimer;
    function throttle() {
      window.clearTimeout(throttleTimer);
      throttleTimer = window.setTimeout(function() {
          dc.redrawAll();
      }, 250);
    }
  }

  //DATEPICKER FUNCTIONALITY
  var inidate;
  var enddate;
  //Get current date for datepicker end date
  var currentDate = function(sp){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
  };
  //Initialize datepicker
  var dateFormat = "dd/mm/yy",
	from = $( "#from" ).datepicker({
		defaultDate: "01/01/2012",
		changeMonth: true,
		dateFormat: "dd/mm/yy"
	})
	.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
		inidate = getDate( this );	  
	}),
	to = $( "#to" ).datepicker({
	defaultDate: currentDate("/"),
	changeMonth: true,
	dateFormat: "dd/mm/yy"
	})
	.on( "change", function() {
	from.datepicker( "option", "maxDate", getDate( this ) );
	enddate = getDate( this );
  });
  //Get date
  function getDate(element) {
		var date;
		try {
		date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
		date = null;
		}
		return date;
  }
  //Set ini and end default dates
	$( "#from" ).val('01/01/2012');
	$( "#to" ).val(currentDate("/"));
	inidate = $( "#from" ).datepicker( "getDate" );
  enddate = $( "#to" ).datepicker( "getDate" );
  
  //Date filter
  $("#datefilter").click(function () {
    dateEvent.filter(function(d) { 
      return (d == "" || ((d.getTime() >= inidate.getTime()) && (d.getTime() <= enddate.getTime())));
    });
		throttle();
		var throttleTimer;
		function throttle() {
			window.clearTimeout(throttleTimer);
			throttleTimer = window.setTimeout(function() {
				dc.redrawAll();
			}, 250);
		}
  });
  
  //Set word for wordcloud
  var setword = function(wd) {
    //console.log(charts.subject.chart);
    $("#search-input").val(wd);
    var s = wd.toLowerCase();
    searchDimension.filter(function(d) { 
      return d.indexOf(s) !== -1;
    });
    throttle();
    var throttleTimer;
    function throttle() {
      window.clearTimeout(throttleTimer);
      throttleTimer = window.setTimeout(function() {
        console.log ("redraw");
          dc.redrawAll();
      }, 250);
    }
  }

  //Reset charts
  var resetGraphs = function() {
    for (var c in charts) {
      if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
        charts[c].chart.filterAll();
      }
    }
    searchDimension.filter(null);
    dateEvent.filter(null);
    $('#search-input').val('');
    dc.redrawAll();
  }
  $('.reset-btn').click(function(){
    resetGraphs();
  })
  
  //Render charts
  createLevelChart();
  createDepartmentChart();
  createHostsChart();
  createOrganizationsChart();
  createWordcloudChart();
  createTable();

  $('.dataTables_wrapper').append($('.dataTables_length'));

  //Toggle last charts functionality and fix for responsiveness
  vuedata.showAllCharts = false;
  $('#charts-toggle-btn').click(function(){
    if(vuedata.showAllCharts){
      resizeGraphs();
    }
  })

  //Hide loader
  vuedata.loader = false;

  //COUNTERS
  //Main counter
  var all = ndx.groupAll();
  var counter = dc.dataCount('.dc-data-count')
    .dimension(ndx)
    .group(all);
  counter.render();
  //Update datatables
  counter.on("renderlet.resetall", function(c) {
    RefreshTable();
  });

  //Lobbyists counter
  function drawLobbyistsCounter() {
    var dim = ndx.dimension (function(d) {
      if (!d.organisation) {
        return "";
      } else {
        return d.organisation;
      }
    });
    var group = dim.group().reduce(
      function(p,d) {  
        p.nb +=1;
        if (!d.organisation) {
          return p;
        }
        return p;
      },
      function(p,d) {  
        p.nb -=1;
        if (!d.Id) {
          return p;
        }
        return p;
      },
      function(p,d) {  
        return {nb: 0}; 
      }
    );
    group.order(function(p){ return p.nb });
    var counter = dc.dataCount(".count-box-orgs")
    .dimension(group)
    .group({value: function() {
      return group.all().filter(function(kv) {
        if (kv.value.nb >0) {
        }
        return kv.value.nb > 0; 
      }).length;
    }})
    .renderlet(function (chart) {
    });
    counter.render();
  }
  drawLobbyistsCounter();

  //Window resize function
  window.onresize = function(event) {
    resizeGraphs();
  };
})
