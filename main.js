// Function to fetch weather and send to XIAO
async function updateDisplay() {
    const API_KEY = 'your_openweathermap_api_key';
        const city = 'London';
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

                const res = await fetch(url);
                    const weatherData = await res.json();

                        // Map the 5-day forecast temps into a byte array
                            const temps = new Uint8Array([
                                    weatherData.list[0].main.temp,  // Today
                                            weatherData.list[8].main.temp,  // Day 2
                                                    weatherData.list[16].main.temp, // Day 3
                                                            weatherData.list[24].main.temp, // Day 4
                                                                    weatherData.list[32].main.temp  // Day 5
                                                                        ]);

                                                                            // Connect to XIAO via BLE
                                                                                const device = await navigator.bluetooth.requestDevice({
                                                                                        filters: [{ name: 'XIAO-Weather' }],
                                                                                                optionalServices: ['180d']
                                                                                                    });
                                                                                                        const server = await device.gatt.connect();
                                                                                                            const service = await server.getPrimaryService('180d');
                                                                                                                const char = await service.getCharacteristic('2a37');

                                                                                                                    await char.writeValue(temps);
                                                                                                                        console.log("Weather Sent!");
                                                                                                                        }
                                                                                                                        
