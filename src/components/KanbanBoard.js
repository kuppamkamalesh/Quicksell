// src/components/KanbanBoard.js

import React, { useState, useEffect } from "react";
import DisplayDropdown from "./DisplayDropdown";
import { fetchData } from "../utils/fetchData";
import "../styles/Bajaj.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [grouping, setGrouping] = useState(
    () => localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    () => localStorage.getItem("ordering") || "priority"
  );

  useEffect(() => {
    fetchData(setTickets, setUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
  }, [grouping, ordering]);

  const groupTickets = () => {
    return tickets.reduce((acc, ticket) => {
      const key = ticket[grouping];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortedTickets = (ticketArray) => {
    return [...ticketArray].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupedTickets = groupTickets();

  const priorityImages = {
    4: "icons_FEtask/SVG - Urgent Priority colour.svg",
    3: "icons_FEtask/Img - High Priority.svg",
    2: "icons_FEtask/Img - Medium Priority.svg",
    1: "icons_FEtask/Img - Low Priority.svg",
    0: "icons_FEtask/No-priority.svg",
  };

  const statusImages = {
    todo: "icons_FEtask/To-do.svg",
    inprogress: "icons_FEtask/In-progress.svg",
    backlog: "icons_FEtask/Backlog.svg",
  };

  const renderPriorityLabels = () => {
    return (
      <div className="priority-labels">
        {Object.keys(priorityImages).map((priority) => (
          <div key={priority} className="priority-label">
            <img
              src={priorityImages[priority]}
              alt={`Priority ${priority}`}
              className="priority-icon"
            />
            <span>{`Priority ${priority}`}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <DisplayDropdown
          onGroupChange={setGrouping}
          onOrderChange={setOrdering}
          groupBy={grouping}
          orderBy={ordering}
        />
      </div>

      {grouping === "priority" && renderPriorityLabels()}

      <div
        className={`kanban-board ${
          grouping === "userId" ? "user-grouping" : ""
        }`}
      >
        {Object.keys(groupedTickets).length > 0 ? (
          Object.keys(groupedTickets).map((groupKey) => (
            <div key={groupKey} className="kanban-row">
              {grouping === "userId" && (
                <h3 className="row-title">
                  {users[groupKey]?.name || "Unknown User"}
                </h3>
              )}

              <div className="kanban-row-content">
                {sortedTickets(groupedTickets[groupKey]).map((ticket) => {
                  const statusKey = ticket.status.toLowerCase();
                  const userName = users[ticket.userId]?.name || "Unknown User";

                  return (
                    <div key={ticket.id} className="kanban-card">
                      <div className="card-header">
                        <img
                          src={
                            statusImages[statusKey] || "icons_FEtask/To-do.svg"
                          }
                          alt={ticket.status}
                          className="status-icon"
                        />
                        <h4>{ticket.title}</h4>
                      </div>

                      <div className="priority-section">
                        <div className="user-circle">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
