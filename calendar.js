/***
Version 0.11 - calendar.js 

What's New
- Use Event Delegation to assign click events

See https://github.com/socrates3142/tailwind-datepicker
***/

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var today = new Date()
var selectedDate = null

// Render
renderCalendar()

function renderCalendar() {

    let calendarNode = document.getElementById('calendar')

    // Clear existing nodes first
    while (calendarNode.firstChild) {
        calendarNode.removeChild(calendarNode.firstChild)
    }

    // Create the container per month
    for (var i = 1; i <= 12; i++) {

        let el = document.createElement('div')
        el.id = 'm' + i

        calendarNode.appendChild(el)

        // Assume year 2020
        renderDay(i, 2020)
    }

    // Assign click event - Run this once!
    // Uses the Event Delegation Technique as element is dynamically created - https://davidwalsh.name/event-delegate
    document.addEventListener('click', function (e) {
        
        if (e.target && e.target.matches("a.day")) {
            //do something
            selectedDate = new Date(e.target.dataset.date)

            // Optional - Extended from original source
            let datePlaceholder = document.getElementById('date-input')

            if (datePlaceholder !== null) {
                document.getElementById('date-input').value = e.target.dataset.date
            }
        }
    });
}

/**
month - Int I.e 1 to 12
year - Int I.e 2000
**/
function renderDay(month, year) {

    // Get total days in month
    let totalDaysInMonth = daysInMonth(month, year)

    // Append month header
    let el = document.createElement('p')
    el.textContent = months[month - 1] + ' ' + year
    el.className = 'p-3 font-semibold text-lg text-gray-700'
    document.getElementById('m' + month).appendChild(el)

    // Append days in month
    for (var i = 1; i <= totalDaysInMonth; i++) {
        let el = document.createElement('a')

        // I.e 2000-01-30
        let isoDate = year + '-' + month.toString().padStart(2, '0') + '-' + i.toString().padStart(2, '0')

        el.textContent = i
        // Customise Tailwind classes here
        el.className = 'day relative w-1/6 text-center p-5 inline-block cursor-pointer border-r border-b'
        el.setAttribute('data-date', isoDate)

        // Optionally append event dot container
        let elP = document.createElement('p')
        elP.classList.add('absolute', 'left-0', 'top-0', 'p-2', 'text-red-400')
        el.appendChild(elP)

        document.getElementById('m' + month).appendChild(el)

        // Optionally highlight today
        if (today.toISOString().split('T')[0] == isoDate) {
            el.classList.add('text-red-400')
        }

        // Optionally highlight selection
        if (selectedDate !== null && selectedDate.toISOString().split('T')[0] == isoDate) {
            el.classList.add('bg-yellow-100')
        }
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
