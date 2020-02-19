/***
See https://github.com/socrates3142/tailwind-datepicker
***/

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var currentDate = new Date()

var selectedMonthDO = new Date()

// Render
renderCurrentDate()
renderMonthSelection()
renderDaySelection()

// Func
function prevMonth() {
    selectedMonthDO.addMonth(-1)
    renderMonthSelection()
    renderDaySelection()
}

function nextMonth() {
    selectedMonthDO.addMonth(1)
    renderMonthSelection()
    renderDaySelection()
}

function renderMonthSelection() {
    
    let monthSelection = document.getElementById('month-selection')
    
    // Optional
    if(monthSelection !== null) {
    
        document.getElementById('month-selection').textContent = months[selectedMonthDO.getMonth()] + ' ' + selectedMonthDO.getFullYear()
    }
}

function renderDaySelection() {

    // Clear existing nodes first
    let daySelectionNode = document.getElementById('day-selection')

    while (daySelectionNode.firstChild) {
        daySelectionNode.removeChild(daySelectionNode.firstChild)
    }

    // Get total days in month
    let totalDaysInMonth = daysInMonth(selectedMonthDO.getMonth() + 1, selectedMonthDO.getFullYear())

    // Append new nodes
    for (i = 1; i <= totalDaysInMonth; i++) {
        let el = document.createElement('a')
        el.textContent = i
        // Customise Tailwind classes here
        el.className = 'day w-1/6 text-center p-3 inline-block cursor-pointer'
        document.getElementById('day-selection').appendChild(el)


        // Optionally highlight selection
        if (currentDate.getDate() == i && currentDate.getMonth() == selectedMonthDO.getMonth() && currentDate.getFullYear() == selectedMonthDO.getFullYear()) {
            el.classList.add('bg-gray-400')
        }
    }

    // Assign click event
    document.querySelectorAll('.day').forEach((el) => {
        el.addEventListener('click', () => {
            currentDate.setDate(parseInt(el.textContent))
            currentDate.setMonth(selectedMonthDO.getMonth())
            currentDate.setYear(selectedMonthDO.getFullYear())

            renderDaySelection()
            renderCurrentDate()
            
            // Optional - Extended from original source
            let datePlaceholder = document.getElementById('datepicker')
            
            if(datePlaceholder !== null) {
                document.getElementById('datepicker').value = currentDate.toISOString().split('T')[0]    
            }
            
        })
    })

}

function renderCurrentDate() {
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-GB')
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Prototypes
Date.prototype.addMonth = function (n) {
    return new Date(this.setMonth(this.getMonth() + n, 1))
}
