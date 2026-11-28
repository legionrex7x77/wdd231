const form = document.querySelector('#sizing-form');
const summaryEl = document.querySelector('#calc-summary');
const metricsEl = document.querySelector('#calc-metrics');

function renderCalculation(result) {
  if (!summaryEl || !metricsEl) return;
  summaryEl.textContent = `For ${result.dailyWh} Wh/day at ${result.systemVoltage}V (${result.peakSun} peak sun hrs, ${result.autonomyDays} autonomy day(s)):`;
  metricsEl.innerHTML = `
    <li><strong>Battery Bank Needed:</strong> ${result.batteryWh} Wh (${result.batteryAh} Ah @ ${result.systemVoltage}V)</li>
    <li><strong>Recommended Solar Array:</strong> ${result.recommendedSolarWatts} W minimum</li>
    <li><strong>Estimated Charge Current:</strong> ${result.chargeAmps} A</li>
  `;
}

if (form) {
  const previousRaw = localStorage.getItem('chalcoSolarLastCalc');
  if (previousRaw) {
    try {
      const previous = JSON.parse(previousRaw);
      document.querySelector('#daily-wh').value = previous.dailyWh;
      document.querySelector('#system-voltage').value = previous.systemVoltage;
      document.querySelector('#peak-sun').value = previous.peakSun;
      document.querySelector('#autonomy-days').value = previous.autonomyDays;
      renderCalculation(previous);
    } catch {
      // Ignore malformed storage data
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const dailyWh = Number(document.querySelector('#daily-wh').value);
    const systemVoltage = Number(document.querySelector('#system-voltage').value);
    const peakSun = Number(document.querySelector('#peak-sun').value);
    const autonomyDays = Number(document.querySelector('#autonomy-days').value);

    const batteryWh = Math.round((dailyWh * autonomyDays) / 0.8);
    const batteryAh = Math.round(batteryWh / systemVoltage);
    const recommendedSolarWatts = Math.round(dailyWh / (peakSun * 0.78));
    const chargeAmps = Math.round(recommendedSolarWatts / systemVoltage);

    const result = {
      dailyWh,
      systemVoltage,
      peakSun,
      autonomyDays,
      batteryWh,
      batteryAh,
      recommendedSolarWatts,
      chargeAmps
    };

    localStorage.setItem('chalcoSolarLastCalc', JSON.stringify(result));
    renderCalculation(result);
  });
}