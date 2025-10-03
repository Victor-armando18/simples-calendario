const CalendarApp = (function() {
   
    const BUSSINESS_RULES_PATH = "core/";
    const SECTION_OF_CALENDAR_DAYS = document.getElementById('calendarDays');
    const PREVIOUS_MONTH_BUTTON = document.getElementById('previousMonthButton');
    const NEXT_MONTH_BUTTON = document.getElementById('nextMonthButton');
    const SELECTED_MONTH = document.getElementById('monthSelect');
    const SELECTED_YEAR = document.getElementById('yearSelect');
    const MONTHS = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let markedDays = [];

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function loadMarkedDays() {
        try {
            const response = await fetch(`${BUSSINESS_RULES_PATH}loadMarkedDays.php`);
            validateResponse(response);
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Erro ao carregar datas marcadas. Motivo: ", error);
            return [];
        }
    }

    async function saveMarkedDay() {
        try {
            const response = await fetch(`${BUSSINESS_RULES_PATH}saveMarkedDays.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(markedDays)
            });
            validateResponse(response);
            const result = await response.text();
            console.log("Mensagem:", result);
        } catch (error) {
            console.error("Erro ao salvar o dia marcado. Motivo: ", error);
        }
    }

    function validateResponse(operation) {
        if (!operation.ok) throw new Error(`Ocorreu um erro com o status: ${response.status}.`);
    }

    function populateMonthSelect() {
        SELECTED_MONTH.innerHTML = '';
        MONTHS.forEach((month, index) => buildSelectOption(SELECTED_MONTH, index, month));
    }

    function populateYearSelect() {
        SELECTED_YEAR.innerHTML = '';
        const startYear = 2000, endYear = currentYear + 10;
        for (let year = startYear; year <= endYear; year++) buildSelectOption(SELECTED_YEAR, year, year);
    }

    function buildSelectOption(element, value, description) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = description;
        element.appendChild(option);
    }

    async function renderCalendar() {

        markedDays = await loadMarkedDays();

        SECTION_OF_CALENDAR_DAYS.innerHTML = '';

        updateSelects();

        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

        // Preenche os dias vazios no início do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            SECTION_OF_CALENDAR_DAYS.appendChild(emptyDay);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const formattedDate = formatDate(date);

            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = day;
            dayEl.dataset.date = formattedDate;

            if (markedDays.includes(formattedDate)) dayEl.classList.add('marked');

            dayEl.addEventListener('click', () => toggleMarkedDay(formattedDate, dayEl));

            SECTION_OF_CALENDAR_DAYS.appendChild(dayEl);
        }
    }

    function toggleMarkedDay(date, element) {
        const index = markedDays.indexOf(date);
        var isSelectedDayMarked = index > -1;

        if (isSelectedDayMarked) {
            markedDays.splice(index, 1);
            element.classList.remove('marked');
        } else {
            markedDays.push(date);
            element.classList.add('marked');
        }
        saveMarkedDay();
    }

    function updateSelects() {
        SELECTED_MONTH.value = currentMonth;
        SELECTED_YEAR.value = currentYear;
    }

    function init() {

        populateMonthSelect();
        populateYearSelect();

        PREVIOUS_MONTH_BUTTON.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        NEXT_MONTH_BUTTON.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });

        SELECTED_MONTH.addEventListener('change', (event) => {
            currentMonth = parseInt(event.target.value);
            renderCalendar();
        });

        SELECTED_YEAR.addEventListener('change', (event) => {
            currentYear = parseInt(event.target.value);
            renderCalendar();
        });

        renderCalendar();
    }

    return {
        init: init
    };
})();


document.addEventListener('DOMContentLoaded', () => CalendarApp.init());