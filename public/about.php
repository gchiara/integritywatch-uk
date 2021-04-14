<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta property="og:url" content="https://openaccess.transparency.org.uk" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Open Access UK: monitor lobbying meetings with Government" />
    <meta property="og:description" content="Who’s #lobbying the UK Parliament? Check Open Access UK" />
    <meta property="og:image" content="https://openaccess.transparency.org.uk/images/thumbnail.png" />
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <?php include 'header.php' ?>

    <div id="app" class="aboutPage">    
      <div class="container">
        <div class="panel-group" id="accordion">
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">1. ABOUT</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Open Access UK is a central hub that allows you to understand who is meeting with government, when and for what purpose. The UK Government publishes this data, but it is scattered in different locations and difficult to access. We collect, harmonise and make this data easily available so it is easier for you to interrogate.</p>
                <p>The platform allows you to search, rank and filter the information in an intuitive way. You can download the data in <a href="https://en.wikipedia.org/wiki/Comma-separated_values" target="_blank">Comma Separated Value (CSV)</a> format for your own analysis.</p>
                <p>The tool does not currently include meetings with Ministers’ special advisers or senior civil servants. If you would like to fund us to collect this data then please <a href="http://www.transparency.org.uk/who-we-are/contact-us/#.WsyhqC7waUk">contact us</a>.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">2. WHY TRANSPARENCY IS IMPORTANT</a>
              </h1>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Ministers are expected to “maintain high standards of behaviour and to behave in a way that upholds the highest standards of propriety” and observe the Seven Principles of Public Life (<a target="_blank" href="https://www.gov.uk/government/publications/ministerial-code">Ministerial Code</a>).</p>
                <p>When the letter and spirit of these rules are not followed it can give rise to the perception that Ministers are abusing the power entrusted in them for private gain. This can include:</p>
                <ul>
                <li>Ministers being used by their political parties to solicit donations in return for political access whilst they are acting in their capacity as a senior member of a political party.</li>
                <li>Ministers undertaking government business in their private time without the attendance of their private secretary of a government official.</li>
                <li>Ministers bringing friends or close associates along to official meetings, which could provide them with preferential business opportunities.</li>
                <li>Ministers using their time in office to secure future employment with those they interact with in their official duties.</li>
                </ul>
                <p>There are also concerns that disproportionate access to decision-makers is secured by powerful private interests, which can distort government policy to the detriment of the public interest.</p>
                <p>This tool can help enable citizens, journalists and civil society to identify and investigate potential wrongdoing, and seek action when Ministers or those they meet have acted improperly.</p>
                <p>We have included a link to <a target="_blank" href="https://www.whatdotheyknow.com/">WhatDoTheyKnow</a> to help users make Freedom of Information requests on any meetings they want to interrogate in more detail.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">3. WHERE THIS DATA COMES FROM</a>
              </h1>
            </div>
            <div id="collapse3" class="panel-collapse collapse in">
              <div class="panel-body">
              <p>UK Government departments are required by the <a href="https://www.gov.uk/government/publications/ministerial-code" target="_blank">Ministerial Code</a> to publish the details of Ministers’ meetings with external organisations quarterly. This should cover all external meetings Ministers have whilst on official business. It does not include meetings Ministers have in their capacity as a member of a political party.</p>
              <p>Government Digital Service provides departments with <a href="https://www.gov.uk/guidance/how-to-publish-ministerial-gifts-hospitality-travel-and-meetings" target="_blank">guidance</a> on how to publish this data.</p>
              <p>Compliance with the code is overseen by the Propriety and Ethics Team in the Cabinet Office.</p>
              <p>All data on Ministers’ meetings with external organisations is published on <a href="https://www.gov.uk/government/policies/government-transparency-and-accountability?keywords=ministerial+gifts%2C+hospitality%2C+travel+and+meetings&detailed_format%5B%5D=transparency-data&public_timestamp%5Bfrom%5D=&public_timestamp%5Bto%5D=" target="_blank">UK Government departments’ websites</a>.</p>
              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">4. NOTES ON THE DATA</a>
              </h1>
            </div>
            <div id="collapse4" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Currently the tool includes data from 2012.</p>
                <p>We aim to publish updates to Ministerial meetings data within a month of their publication on departments’ websites.</p>
                <p>Data on meetings between 2010 to 2017 were collected using scripts developed by the University of Oxford. The GitHub repository for these scripts can be found <a href="https://github.com/ianknowles/EarTimeWrangler" target="_blank">here</a>.</p>
                <p>There are many inaccuracies and inconsistencies in the original data that we have sought to address through manual checks and, where necessary, manual data entry.</p>

                <h3>CHANGES WE HAVE MADE</h3>
                <p>We have <strong>corrected dates</strong> where this is an obvious error, for example, if a meeting is reported to have been published in 2104.</p>
                <p>We have <strong>completed incomplete date values</strong>, for example, if a meeting is reported to have taken place in June and no specific day has been given. As a default we have set these dates to the first day of the relevant month, for example, “June 2017” is corrected to “01/06/2017”.</p>
                <p>We have standardised the <strong>names of Ministers</strong> so it is easier for users to search.</p>
                <p>We have used data from <a href="http://www.data.parliament.uk/" target="_blank">data.parliament.uk</a> to categorise the <strong>seniority of Ministers</strong>.</p>
                <p>We have included the <strong>unique identifier</strong> <a href="http://data.parliament.uk/membersdataplatform/memberquery.aspx" target="_blank">data.parliament.uk</a> assigns to Parliamentarians in our data to allow users to link this dataset with other data published by the UK Parliament and third parties, like <a href="http://docs.everypolitician.org/submitting.html" target="_blank">mySociety</a>.</p>

                <h3>CHANGES WE HAVE NOT MADE</h3>
                <p>We have not tried to standardise the names of organisations meeting with Ministers.</p>

                <h3>DISCLAIMER</h3>
                <p><strong>Although we have taken all reasonable measures to ensure the data we publish is as accurate as possible, we recommend you always check any findings from the tool against the source data on departments’ websites.</strong></p>

                <h3>LICENCE</h3>
                <p>The tool contains public sector information licensed under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank">Open Government Licence v3.0</a> and Parliamentary information licensed under the <a href="https://www.parliament.uk/site-information/copyright/open-parliament-licence/" target="_blank">Open Parliament Licence v3.0</a>. The data is published under the <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">Open Data Commons Open Database License (ODbL)</a>.</p>
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">CONTACT DETAILS</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
                <p>If your questions have not been answered here please contact:</p>
                <p>
                + 44 (0)20 3096 7676
                <a href="mailto:info@transparency.org.uk">info@transparency.org.uk</a>
                </p>
              </div>
            </div>
          </div>
          <!-- SPONSORS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">PROJECT SPONSORS</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
              <p>The project is co-funded by the University of Oxford through a grant from the <a href="https://esrc.ukri.org/funding/funding-opportunities/impact-acceleration-accounts/" target="_blank">Economic and Social Research Council (ESRC) Impact Acceleration Account</a>, the <a href="https://www.jrct.org.uk/" target="_blank">Joseph Rowntree Charitable Trust (JRCT)</a>, The Amberstone Trust, <a href="https://www.omidyar.com/" target="_blank">Omidyar Network</a>, <a href="https://transparency.eu/" target="_blank">Transparency International EU</a> (TI EU) and the <a href="https://www.juliahansrausingtrust.org/" target="_blank">Hans and Julia Rausing Trust</a>.</p>
              <p>The tool publishing the data is co-funded by the <a href="http://www.opensocietyfoundations.org/about/programs/open-society-initiative-europe" target="_blank">Open Society Initiative for Europe (OSIFE)</a>, with a contribution by the <a href="http://www.kbs-frb.be/index.aspx?langtype=1033" target="_blank">King Baudouin Foundation (KBF)</a>.</p>
              <p>Website design and development: <a href="http://www.chiaragirardelli.net">Chiara Girardelli</a></p>
              <p>The technology behind the platform (<a href="https://d3js.org/" target="_blank">D3.js</a>) was developed by the New York Times in order to make complex datasets accessible to a wider audience.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>