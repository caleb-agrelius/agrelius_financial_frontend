import React from 'react';
import '../App.css';

type UsageRecord = {
  engineer: string;
  team: string;
  role: string;
  monthlyTokens: number;
  recentTokens: number;
  averageTokensPerSession: number;
  sessions: number;
  topAgent: string;
  utilizationChange: number;
};

const usageData: UsageRecord[] = [
  {
    engineer: 'Sophia Patel',
    team: 'Platform',
    role: 'Senior Software Engineer',
    monthlyTokens: 98200,
    recentTokens: 21400,
    averageTokensPerSession: 1260,
    sessions: 17,
    topAgent: 'Review Agent',
    utilizationChange: 14,
  },
  {
    engineer: 'Jordan Lee',
    team: 'Infrastructure',
    role: 'DevOps Engineer',
    monthlyTokens: 72100,
    recentTokens: 18250,
    averageTokensPerSession: 950,
    sessions: 19,
    topAgent: 'Build Agent',
    utilizationChange: 9,
  },
  {
    engineer: 'Mia Nguyen',
    team: 'Product',
    role: 'Product Engineer',
    monthlyTokens: 58120,
    recentTokens: 13580,
    averageTokensPerSession: 820,
    sessions: 16,
    topAgent: 'Planning Agent',
    utilizationChange: 22,
  },
  {
    engineer: 'Rafael Morgan',
    team: 'Security',
    role: 'Security Engineer',
    monthlyTokens: 47200,
    recentTokens: 11120,
    averageTokensPerSession: 710,
    sessions: 15,
    topAgent: 'Audit Agent',
    utilizationChange: 6,
  },
  {
    engineer: 'Avery Chen',
    team: 'Platform',
    role: 'Software Engineer',
    monthlyTokens: 38950,
    recentTokens: 9500,
    averageTokensPerSession: 650,
    sessions: 12,
    topAgent: 'Code Agent',
    utilizationChange: -3,
  },
];

const timeframes = ['Last 7 days', 'Last 30 days', 'Quarter to date'];

const TokenDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState(timeframes[1]);
  const [selectedTeam, setSelectedTeam] = React.useState('All Teams');
  const [searchValue, setSearchValue] = React.useState('');

  const filteredRecords = usageData.filter((record) => {
    const matchesTeam = selectedTeam === 'All Teams' || record.team === selectedTeam;
    const matchesSearch = !searchValue || record.engineer.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const totalMonthlyTokens = filteredRecords.reduce((sum, record) => sum + record.monthlyTokens, 0);
  const totalRecentTokens = filteredRecords.reduce((sum, record) => sum + record.recentTokens, 0);
  const totalEngineers = filteredRecords.length;
  const averageTokens = totalEngineers ? Math.round(totalMonthlyTokens / totalEngineers) : 0;

  const topEngineers = [...filteredRecords].sort((a, b) => b.monthlyTokens - a.monthlyTokens).slice(0, 5);
  const maxTokens = topEngineers.length ? topEngineers[0].monthlyTokens : 1;

  const teams = ['All Teams', ...Array.from(new Set(usageData.map((record) => record.team)))];

  const labelForTimeframe = selectedTimeframe === 'Last 7 days' ? 'This week' : selectedTimeframe;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Copilot Agent Token Usage</h1>
          <p className="page-text">
            Track enterprise Copilot Agent token consumption by team, engineer, and agent type. Filter usage to see how each engineer is contributing to token spend.
          </p>
        </div>
      </div>

      <div className="dashboard-actions">
        <label className="dashboard-filter-label">
          Timeframe
          <select
            className="dashboard-filter"
            value={selectedTimeframe}
            onChange={(event) => setSelectedTimeframe(event.target.value)}
          >
            {timeframes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="dashboard-filter-label">
          Team
          <select
            className="dashboard-filter"
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
          >
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </label>

        <label className="dashboard-filter-label dashboard-search-label">
          Engineer
          <input
            className="dashboard-filter"
            type="search"
            placeholder="Search engineer"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            aria-label="Search engineer"
          />
        </label>
      </div>

      <div className="dashboard-summary">
        <article className="dashboard-card">
          <span className="metric-label">Total tokens tracked</span>
          <strong className="metric-value">{totalMonthlyTokens.toLocaleString()}</strong>
          <span className="metric-note">Across {totalEngineers} engineer{totalEngineers === 1 ? '' : 's'}</span>
        </article>

        <article className="dashboard-card">
          <span className="metric-label">{labelForTimeframe} tokens</span>
          <strong className="metric-value">{totalRecentTokens.toLocaleString()}</strong>
          <span className="metric-note">Updated from agent telemetry</span>
        </article>

        <article className="dashboard-card">
          <span className="metric-label">Average monthly tokens</span>
          <strong className="metric-value">{averageTokens.toLocaleString()}</strong>
          <span className="metric-note">Per engineer on filtered view</span>
        </article>
      </div>

      <section className="dashboard-panel">
        <div className="dashboard-panel-title">
          <h2>Top engineers by token usage</h2>
          <span className="panel-caption">Compare the heaviest Copilot Agent consumers.</span>
        </div>
        <div className="dashboard-bar-list">
          {topEngineers.map((engineer) => {
            const percent = Math.max(8, Math.round((engineer.monthlyTokens / maxTokens) * 100));
            return (
              <div key={engineer.engineer} className="dashboard-bar-row">
                <div className="dashboard-bar-row-title">
                  <span>{engineer.engineer}</span>
                  <strong>{engineer.monthlyTokens.toLocaleString()} tokens</strong>
                </div>
                <div className="dashboard-bar">
                  <div className="dashboard-bar-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-title">
          <h2>Engineer usage details</h2>
          <span className="panel-caption">Use the breakdown to audit Copilot Agent spend by engineer and team.</span>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Engineer</th>
                <th>Team</th>
                <th>Monthly tokens</th>
                <th>Sessions</th>
                <th>Average/session</th>
                <th>Primary agent</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.engineer}>
                  <td>{record.engineer}</td>
                  <td>{record.team}</td>
                  <td>{record.monthlyTokens.toLocaleString()}</td>
                  <td>{record.sessions}</td>
                  <td>{record.averageTokensPerSession.toLocaleString()}</td>
                  <td>{record.topAgent}</td>
                  <td className={record.utilizationChange >= 0 ? 'metric-positive' : 'metric-negative'}>
                    {record.utilizationChange >= 0 ? '+' : ''}
                    {record.utilizationChange}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TokenDashboard;
