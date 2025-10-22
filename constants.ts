
export const INITIAL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Initiative 2: Detailed Plan</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        :root {
            --tm-blue: #0033a0;
            --tm-orange: #f37021;
            --dark-bg: #0a192f;
            --light-text: #ccd6f6;
            --card-bg: #112240;
            --header-text: #e6f1ff;
            --border-color: #233554;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--dark-bg);
            color: var(--light-text);
        }

        .slide {
            min-height: 100vh;
            width: 100%;
            padding: 60px 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .slide-header {
            width: 100%;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid var(--tm-orange);
        }

        .slide-header h1 {
            font-size: 2.8em;
            color: var(--header-text);
            font-weight: 700;
        }
        
        .slide-header h1 .highlight {
            color: var(--tm-orange);
        }

        .slide-header p {
            font-size: 1.2em;
            font-weight: 300;
            max-width: 80%;
            margin-top: 10px;
        }
        
        .phase-container {
            width: 100%;
        }

        .phase {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 30px;
            border-left: 5px solid var(--tm-orange);
            transition: all 0.3s ease;
        }

        .phase:hover {
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateY(-5px);
        }

        .phase-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        .phase-header h2 {
            font-size: 1.8em;
            color: var(--header-text);
            font-weight: 600;
        }
        
        .phase-header .target-date {
            background-color: var(--tm-orange);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 1em;
            font-weight: 600;
        }

        .phase-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 25px;
        }
        
        .deliverable {
            border-top: 1px solid var(--border-color);
            padding-top: 20px;
        }

        .deliverable h3 {
            font-size: 1.4em;
            color: var(--tm-orange);
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .detail-item h4 {
            font-size: 1.1em;
            color: var(--header-text);
            margin-bottom: 8px;
            border-left: 3px solid var(--tm-blue);
            padding-left: 10px;
        }
        
        .detail-item p, .detail-item li {
            font-size: 0.95em;
            line-height: 1.6;
            padding-left: 13px;
        }
        
        .detail-item ul {
            list-style-position: inside;
        }

    </style>
</head>
<body>

    <div class="slide">
        <div class="slide-header">
            <h1>Initiative 2 (Detailed Plan):<br><span class="highlight">Building the Value-Driven Automation Engine</span></h1>
            <p>A detailed, deliverable-focused plan to create a "single source of truth" that automates the tracking of business value, making our commercial impact transparent, predictable, and undeniable.</p>
        </div>

        <div class="phase-container">

            <!-- Phase 1 -->
            <div class="phase">
                <div class="phase-header">
                    <h2>Phase 1: The Execution Dashboard</h2>
                    <div class="target-date">Target: Q2 2026</div>
                </div>
                <div class="phase-content">
                    <div class="deliverable">
                        <h3>Deliverable 1.1: The "Next Leap" Live Value Dashboard</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <h4>Description & Features</h4>
                                <p>A real-time, automated dashboard in a BI tool (e.g., Power BI) serving as the primary review tool for the Next Leap Steering Committee. It will include:</p>
                                <ul>
                                    <li><strong>Total Realized Value (TRV) View:</strong> Tracks actual revenue/cost savings vs. VDT forecast.</li>
                                    <li><strong>Sales Funnel / GTM View:</strong> Visualizes the health of the go-to-market pipeline.</li>
                                    <li><strong>Efficiency & Flow View:</strong> Highlights speed-to-value metrics like Lead Time and Cycle Time.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Success Metrics</h4>
                                <ul>
                                    <li>All Next Leap reviews use this dashboard as the primary data source.</li>
                                    <li>50% reduction in manual status reporting time for teams.</li>
                                    <li>Positive feedback from program lead on data clarity and actionability.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Data Sources & Resources</h4>
                                <ul>
                                    <li><strong>Data:</strong> Financial Systems, CRM (e.g., Salesforce), Agile Tools (e.g., Jira).</li>
                                    <li><strong>Resources:</strong> BI licenses, dedicated Data Analyst/Engineer.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phase 2 -->
            <div class="phase">
                <div class="phase-header">
                    <h2>Phase 2: The Agile Portfolio Management System</h2>
                    <div class="target-date">Target: Q4 2026</div>
                </div>
                <div class="phase-content">
                    <div class="deliverable">
                        <h3>Deliverable 2.1: Implemented Agile Portfolio Management (APM) Tool</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <h4>Description & Features</h4>
                                <p>A fully configured enterprise-grade tool (e.g., Jira Align) providing:</p>
                                <ul>
                                    <li><strong>A Transparent Strategic Backlog:</strong> A single, prioritized list of all major initiatives linked to VDTs.</li>
                                    <li><strong>Automated QBR Data Collection:</strong> System auto-populates a standard template for Quarterly Business Reviews.</li>
                                    <li><strong>Dependency Visualization:</strong> A visual map of dependencies between initiatives for proactive risk management.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Success Metrics</h4>
                                <ul>
                                    <li>100% of strategic initiatives are tracked within the APM tool.</li>
                                    <li>First two QBRs run successfully using automated data.</li>
                                    <li>75% reduction in cross-team conflicts from unidentified dependencies.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Investment & Collaboration</h4>
                                <ul>
                                    <li><strong>Investment:</strong> Budget for APM software licenses and professional services for setup.</li>
                                    <li><strong>Collaboration:</strong> Requires IT support for integration with existing systems.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phase 3 -->
            <div class="phase">
                <div class="phase-header">
                    <h2>Phase 3: The Strategic Insights Hub</h2>
                    <div class="target-date">Prototype Target: 2027</div>
                </div>
                <div class="phase-content">
                    <div class="deliverable">
                        <h3>Deliverable 3.1: The Predictive Delivery Forecast Model</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <h4>Description & Features</h4>
                                <p>A machine learning prototype that analyzes historical data to provide forecasts on:</p>
                                <ul>
                                    <li><strong>Probabilistic Completion Dates:</strong> Moving beyond simple target dates.</li>
                                    <li><strong>Proactive Risk Identification:</strong> Identifying leading indicators of project delays or failures.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Success Metrics</h4>
                                <ul>
                                    <li>Model's forecast accuracy is validated against 3-5 pilot initiatives.</li>
                                    <li>Model insights are used to make at least one significant strategic adjustment.</li>
                                </ul>
                            </div>
                            <div class="detail-item">
                                <h4>Resources & Expertise</h4>
                                <ul>
                                    <li><strong>Expertise:</strong> Dedicated Data Scientist with ML skills.</li>
                                    <li><strong>Data:</strong> Requires access to clean, comprehensive historical project data.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</body>
</html>
`;
