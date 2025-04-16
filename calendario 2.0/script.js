const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"];
const datesContainer = document.getElementById("dates");
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = new Date();

// Emojis para los días de la semana
const weekdayEmojis = ["📚", "🎨", "🏀", "🎵", "🎮", "🍕", "🎪"];

function loadCalendar(month = currentMonth, year = currentYear) {
    datesContainer.innerHTML = "";
    document.getElementById("month").textContent = monthNames[month];
    document.getElementById("year").textContent = year;

    // Ajuste para que la semana comience en lunes (0: lunes, 6: domingo)
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 7 : firstDay; // Convertir domingo (0) a 7
    let totalDays = new Date(year, month + 1, 0).getDate();

    // Celdas vacías para días anteriores al primer día del mes
    for (let i = 1; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day", "empty");
        datesContainer.appendChild(emptyDiv);
    }

    // Crear botones para cada día del mes
    for (let i = 1; i <= totalDays; i++) {
        const dayButton = document.createElement("button");
        dayButton.classList.add("day");
        dayButton.textContent = i;
        
        // Marcar el día de hoy
        let today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayButton.classList.add("today");
        }
        
        // Verificar si el día coincide con la fecha seleccionada
        if (i === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
            dayButton.classList.add("selected");
        }
        
        datesContainer.appendChild(dayButton);

        // Añadir event listener al botón
        dayButton.addEventListener("click", () => {
            // Eliminar la clase selected de todos los días
            document.querySelectorAll(".day").forEach(day => {
                day.classList.remove("selected");
            });
            
            // Añadir la clase selected al día seleccionado
            dayButton.classList.add("selected");
            
            const date = new Date(year, month, i);
            selectedDate = date;
            showEventsForDay(date);
        });
    }

    loadEvents(year, month);
}

document.getElementById("prev-month").addEventListener("click", () => {
    const sound = new Audio('data:audio/wav;base64,UklGRl9vT19TAElGRkkAAAABAAAASVBERQAAAAEAAABJTkZPSUNSRAAAAElDT1BZUklHSFQAUHVibGljIERvbWFpbgBJRElTVAAAAFNvdW5kIEVmZmVjdABJQVJUAAAAU291bmQgRWZmZWN0AElHTlIAAAAATElTVFQAAABXQVZFZm10IAAAAAAAAAAAAQEBAQEAAABkYXRhZm10AAAAAAAAAAAAAgAAAAEA//8DAAAABQAAAAcAAAAKAAAADgAAABIAAAAXAAAAHAAAACEAAAAlAAAAKgAAAC8AAAA0AAAAOQAAADwAAAA/AAAAQQAAAEEAAABAAAAAPgAAADwAAAA4AAAANgAAADEAAAAsAAAAJwAAACAAAAAbAAAAFQAAABAAAAAnAAAAUQAAAHUAAACXAAAAswAAAM0AAADmAAAA+gAAAEsBAABiAQAAbwEAAHoBAAB+AQAAfgEAAHgBAABuAQAAYgEAAFQBAABGAQAAOQEAACwBAAAfAQAAEgEAAAUBAAD6AAAA8AAAAOcAAADgAAAA2gAAANQAAADQAAAAzAAAAMkAAADHAAAAxgAAAMUAAADGAAAAxwAAAMgAAADKAAAAzAAAAM4AAADQAAAA0gAAANMAAADUAAAA1QAAANUAAADVAAAAzQAAAMIAAAC0AAAApwAAAJsAAACSAAAAiwAAAIUAAACAAAAAe3t7');
    sound.play();
    
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    loadCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
    const sound = new Audio('data:audio/wav;base64,UklGRl9vT19TAElGRkkAAAABAAAASVBERQAAAAEAAABJTkZPSUNSRAAAAElDT1BZUklHSFQAUHVibGljIERvbWFpbgBJRElTVAAAAFNvdW5kIEVmZmVjdABJQVJUAAAAU291bmQgRWZmZWN0AElHTlIAAAAATElTVFQAAABXQVZFZm10IAAAAAAAAAAAAQEBAQEAAABkYXRhZm10AAAAAAAAAAAEAAABAP//AwAAAAcAAAAMAAAAEgAAABoAAAAiAAAAKwAAADQAAAA8AAAARQAAAE0AAABUAAAAWgAAAF8AAABjAAAAZQAAAGYAAABlAAAAYwAAAF8AAABbAAAAVgAAAFAAAABJAAAAQQAAADgAAAAvAAAABwAAAMgAAABpAAAABQAAALQAAABrAAAAPgAAABgAAAACAAAA+P///wEAAAAnAAAAkgAAAP0AAAB6AQAAAwIAQEsCQJBrAgCgigIAsKECQMO1AgDMxQIAzNMCQMvfAgDF6QIAu/ICQKz5AgCaCgNAhhIDQG8ZAwBWIAMAOycDABouQwD1M0MA0zlDQKg/QwB9RUMAUUtDAB5RQwDqVkMA');
    sound.play();
    
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    loadCalendar(currentMonth, currentYear);
});

// Eventos
const eventDateInput = document.getElementById("event-date");
const eventTitleInput = document.getElementById("event-title");
const selectedDayDisplay = document.getElementById("selected-day");

// Configurar la fecha actual en el selector de fecha
function setDateInputToSelectedDate() {
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    eventDateInput.value = `${selectedDate.getFullYear()}-${month}-${day}`;
}

function saveEvent() {
    const date = eventDateInput.value;
    const title = eventTitleInput.value;

    if (date && title) {
        // Sonido de confirmación
        const confirmSound = new Audio('data:audio/wav;base64,UklGRl9vT19TAElGRkkAAAABAAAASVBERQAAAAEAAABJTkZPSUNSRAAAAElDT1BZUklHSFQAUHVibGljIERvbWFpbgBJRElTVAAAAFNvdW5kIEVmZmVjdABJQVJUAAAAU291bmQgRWZmZWN0AElHTlIAAAAATElTVFQAAABXQVZFZm10IAAAAAAAAAAAAQEBAQEAAABkYXRhZm10AAAAAAAAAAAAAgAAAAEA//8DAAAABQAAAAcAAAAKAAAADgAAABIAAAAXAAAAHAAAACIAAAAoAAAALgAAADQAAAA6AAAAQAAAAEYAAABLAAAATwAAAFMAAABWAAAAWAAAAFkAAABZAAAAWQAAAFgAAABXAAAAVQAAAFMAAABRAAAATgAAAEsAAABIAAAARgAAAEMAAABAAAAAPgAAADsAAAA5AAAANwAAADYAAAA1AAAANAAAADMAAAMyAAAAMQAAADAAAAAuAQkALQIRAC0DIwAuBDUALgdGADEIVwAzCWgANQp4QzgLiEM7DJlDPg2qQzb3ukMP/spDEgHbAxQD7EMXBPxDGQYLRBwHGkQfCClEEwk4BU0KRwVRDFUFVQ5jBVkQcQVdEn8FYRSNRWUWm0VpGKlFbRq3RWo=');
        confirmSound.play();

        const events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push(title);
        localStorage.setItem("calendarEvents", JSON.stringify(events));

        const dateObj = new Date(date);
        loadCalendar(dateObj.getMonth(), dateObj.getFullYear());
        
        // Actualizar la lista de eventos
        showEventsForDay(dateObj);

        // Limpiar el formulario
        eventTitleInput.value = "";
        
        // Mostrar mensaje de confirmación
        const saveEvent = document.getElementById("save-event");
        const originalText = saveEvent.textContent;
        saveEvent.textContent = "¡Guardado! 🎉";
        saveEvent.style.backgroundColor = "#ff9900";
        
        setTimeout(() => {
            saveEvent.textContent = originalText;
            saveEvent.style.backgroundColor = "#66cc99";
        }, 1500);
    }
}

function loadEvents(year, month) {
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    const days = document.querySelectorAll(".day:not(.empty)");

    days.forEach(day => {
        const dayNum = parseInt(day.textContent);
        if (!isNaN(dayNum)) {
            const date = new Date(year, month, dayNum);
            const dateString = date.toISOString().split("T")[0];

            // Elimina la clase 'has-event' antes de volver a verificar los eventos
            day.classList.remove('has-event');

            if (events[dateString] && events[dateString].length > 0) {
                day.classList.add('has-event');
            }
        }
    });
}

function deleteEvent(date, index) {
    // Sonido de eliminación
    const deleteSound = new Audio('data:audio/wav;base64,UklGRl9vT19TAElGRkkAAAABAAAASVBERQAAAAEAAABJTkZPSUNSRAAAAElDT1BZUklHSFQAUHVibGljIERvbWFpbgBJRElTVAAAAFNvdW5kIEVmZmVjdABJQVJUAAAAU291bmQgRWZmZWN0AElHTlIAAAAATElTVFQAAABXQVZFZm10IAAAAAAAAAAAAQEBAQEAAABkYXRhZm10AAAAAAAAAAAAAgAAAAEA//8qAAAAXgAAAJAAAADCAAAA8wAAACABAEU6CgC9fxMAPYUCAM+JAgBUjgIAsZICQP+WAgBCmwIAfZ8CQK6jAgDapwIABasCQCuuAgBLsQIAZbQCQHu3AgCPugIAob0CQK/AAgC7wwIAxMYCQMrJAgDO');
    deleteSound.play();
    
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    if (events[date] && events[date][index]) {
        events[date].splice(index, 1);
        if (events[date].length === 0) {
            delete events[date];
        }
        localStorage.setItem("calendarEvents", JSON.stringify(events));
        
        const dateObj = new Date(date);
        loadCalendar(dateObj.getMonth(), dateObj.getFullYear());
        showEventsForDay(dateObj);
    }
}

function showEventsForDay(date) {
    // Actualizar la fecha seleccionada
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    selectedDayDisplay.textContent = date.toLocaleDateString('es-ES', options);
    
    const dateString = date.toISOString().split("T")[0];
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    const eventsForDay = events[dateString] || [];
    const dayEventsList = document.getElementById("day-events");
    dayEventsList.innerHTML = "";

    if (eventsForDay.length > 0) {
        eventsForDay.forEach((event, index) => {
            const eventItem = document.createElement("li");
            
            // Crear contenido del evento
            const eventText = document.createElement("span");
            eventText.textContent = event;
            eventItem.appendChild(eventText);
            
            // Añadir botón de eliminar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.style.background = "none";
            deleteButton.style.border = "none";
            deleteButton.style.cursor = "pointer";
            deleteButton.style.fontSize = "18px";
            deleteButton.style.float = "right";
            deleteButton.title = "Eliminar evento";
            
            deleteButton.addEventListener("click", () => {
                deleteEvent(dateString, index);
            });
            
            eventItem.appendChild(deleteButton);
            dayEventsList.appendChild(eventItem);
        });
    } else {
        const noEventsItem = document.createElement("li");
        noEventsItem.textContent = "¡No hay eventos para este día! 🎈";
        noEventsItem.style.backgroundColor = "#f0f0f0";
        dayEventsList.appendChild(noEventsItem);
    }
    
    // Actualizar la fecha en el input del formulario
    setDateInputToSelectedDate();
}

document.getElementById("save-event").addEventListener("click", saveEvent);

// Al cargar la página, mostrar la fecha actual
window.addEventListener("load", () => {
    loadCalendar();
    showEventsForDay(new Date());
    setDateInputToSelectedDate();
});