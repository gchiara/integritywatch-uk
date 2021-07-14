<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Open Access UK</title>
    <!-- Twitter and og meta here -->
    <meta property="og:url" content="https://openaccess.transparency.org.uk" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Open Access UK: monitor lobbying meetings with Government" />
    <meta property="og:description" content="Who’s #lobbying the UK Government? Check Open Access UK" />
    <!-- <meta property="og:image" content="https://openaccess.transparency.org.uk/images/thumbnail.png" /> -->
    <meta property="og:image" content="http://www.chiaragirardelli.net/iw-uk-new/images/thumbnail.png" />
    <link rel='shortcut icon' type='image/x-icon' href='./favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/tab_a.css">
</head>
<body>
    <div id="app" class="tabA">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>Open Access UK: monitor lobbying meetings with Government</h1>
                  <p>
                    This is a user-friendly interactive database that provides a unique overview of lobby meetings with UK Government Ministers since 2012. 
                    <a href="about.php">Read more</a>.
                  </p> 
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - LEFT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container">
                <div class="subrow-title">UK GOVERNMENT</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container tab_a_1">
                  <chart-header :title="charts.level.title" :info="charts.level.info" ></chart-header>
                  <div class="chart-inner" id="level_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container tab_a_2">
                  <chart-header :title="charts.department.title" :info="charts.department.info" ></chart-header>
                  <div class="chart-inner" id="department_chart"></div>
                </div>
              </div>
              <div class="col-md-12 chart-col">
                <div class="boxed-container chart-container tab_a_3">
                  <chart-header :title="'DATE'" :info="''"></chart-header>
                  <div class="datefilter-container">
                    <label for="from">From</label>
                    <input type="text" id="from" name="from">
                    <label for="to">to</label>
                    <input type="text" id="to" name="to">
                    <button id="datefilter"><strong>Filter</strong></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - RIGHT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container subrow-title-container-right">
                <div class="subrow-title subrow-title-right">LOBBYIST</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container tab_a_4">
                  <chart-header :title="charts.hosts.title" :info="charts.hosts.info" ></chart-header>
                  <div class="chart-inner" id="hosts_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container tab_a_5">
                  <chart-header :title="charts.organizations.title" :info="charts.organizations.info" ></chart-header>
                  <div class="chart-inner" id="organizations_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- TOGGLE BUTTONS FOR 4TH ROW -->
          <div class="col-md-12 toggle-btn-container">
            <button class="toggle-btn" id="charts-toggle-btn" @click="showAllCharts = !showAllCharts">View key words for meetings</button>
          </div>
          <!-- TOGGLEABLE CHARTS -->
          <div class="col-md-12 chart-col" id="wordcloud_chart_col" v-show="showAllCharts">
            <div class="boxed-container chart-container meetings_6">
              <chart-header :title="charts.subject.title" :info="charts.subject.info" ></chart-header>
              <div class="chart-inner" id="wordcloud_chart"></div>
            </div>
          </div>

          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mainTable.title" :info="charts.mainTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">No</th> 
                      <th class="header">Host</th>
                      <th class="header">Position</th>
                      <th class="header">Department</th> 
                      <th class="header">Purpose</th> 
                      <th class="header">Lobbyist</th> 
                      <th class="header">Date</th> 
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">{{selectedElement.rep_new}} - {{selectedElement.date1}}</div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <!-- Share link -->
                    <div class="copy-input-container">
                      <input type="text" :value="selectedElement.meetingUrl" id="chartUrlString" readonly>
                      <button @click="copyToClipboard('chartUrlString')"><i class="material-icons">content_copy</i> Copy meeting URL</button>
                    </div>
                    <!-- Meeting details -->
                    <div class="details-line"><span class="details-line-title">Date:</span> {{ selectedElement.date1 }}</div>
                    <div class="details-line"><span class="details-line-title">Host:</span> {{ selectedElement.rep_new }}</div>
                    <div class="details-line"><span class="details-line-title">Position:</span> {{ selectedElement.policy_level }}</div>
                    <div class="details-line"><span class="details-line-title">Department:</span> {{ selectedElement.department }}</div>
                    <div class="details-line"><span class="details-line-title">Lobbyist:</span> {{ selectedElement.organisation }}</div>
                    <div class="details-line"><span class="details-line-title">Purpose:</span> {{ selectedElement.purpose }}</div>
                    <div class="modal-request-cta">
                      <div v-if="selectedElement.department_wdtk && selectedElement.department_wdtk !== ''">To submit a Freedom of Information request about this meeting visit <a :href="selectedElement.requestFullUrl" target="_blank">https://www.whatdotheyknow.com/</a></div>
                      <div v-else>To submit a Freedom of Information request about this meeting visit <a href="https://www.whatdotheyknow.com/" target="_blank">https://www.whatdotheyknow.com/</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar">
        <div class="row">
          <div class="footer-col col-12 col-sm-12 footer-counts">
            <div class="dc-data-count count-box">
              <div class="filter-count">0</div>out of <strong class="total-count">0</strong> meetings
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" placeholder="SEARCH BY LOBBYIST, HOST, SUBJECT">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <!-- Reset filters -->
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text">Reset</span></button>
        <div class="footer-buttons-right">
          <button @click="downloadDataset"><i class="material-icons">cloud_download</i></button>
          <button class="btn-twitter" @click="share('twitter')"><img src="./images/twitter.png" /></button>
          <button class="btn-fb" @click="share('facebook')"><img src="./images/facebook.png" /></button>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'Loading ...'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script src="static/tab_a.js"></script>

 
</body>
</html>