const Sidebar = ({
  events = [],
  selectedDate,
  setSelectedDate,
  month,
  year,
  setMonth,
  setYear,
}) => {
  const safeMonth =
    typeof month === "number" && month >= 0 && month <= 11
      ? month
      : new Date().getMonth();

  const safeYear =
    typeof year === "number" ? year : new Date().getFullYear();

  const daysInMonth = new Date(safeYear, safeMonth + 1, 0).getDate();
  const firstDayIndex = new Date(safeYear, safeMonth, 1).getDay();

  const hasEvent = (date) =>
    events.some((e) => e.date === date);

  const changeMonth = (dir) => {
    setSelectedDate(null); // 🔥 reset date on month change

    if (dir === "prev") {
      if (safeMonth === 0) {
        setMonth(11);
        setYear(safeYear - 1);
      } else {
        setMonth(safeMonth - 1);
      }
    } else {
      if (safeMonth === 11) {
        setMonth(0);
        setYear(safeYear + 1);
      } else {
        setMonth(safeMonth + 1);
      }
    }
  };

  return (
    <aside className="sidebar">
      <h3>Schedule</h3>

      <div className="calendar">
        {/* HEADER */}
        <div className="calendar-header">
          <button onClick={() => changeMonth("prev")}>◀</button>

          <span className="calendar-title">
            {new Date(safeYear, safeMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button onClick={() => changeMonth("next")}>▶</button>
        </div>

        {/* WEEKDAYS */}
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* GRID */}
        <div className="calendar-grid">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={i} className="empty-cell" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateValue = `${safeYear}-${String(
              safeMonth + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            return (
              <div
                key={day}
                className={`date-cell ${
                  selectedDate === dateValue ? "active-date" : ""
                }`}
                onClick={() => setSelectedDate(dateValue)}
              >
                {day}
                {hasEvent(dateValue) && <span className="dot" />}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
