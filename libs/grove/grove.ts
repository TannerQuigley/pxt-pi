enum AnalogDeviceType {
    //% block="light sensor"
    LIGHT,
    //% block="sound sensor"
    SOUND,
    //% block="moisture"
    MOISTURE,
    //% block="slide potentiometer"
    SLIDEPOT
}

enum DigitalDeviceType {
    //% block="button"
    BUTTON,
    //% block="water sensor"
    WATERSENSOR,
    //% block="buzzer"
    BUZZER,
    //% block="LED"
    LED,
    //% block="relay"
    RELAY,
    //% block="temp/humidity sensor"
    TEMPERATUREHUMIDITY,
    //% block="ultrasonic sensor"
    ULTRASONIC
}

namespace grove {

    // Following dicts should map to device entries in GrovePi/BlockyTalky
    // remote targets
    const analogDeviceDict = [
        "LIGHT",
        "SOUND",
        "MOISTURE",
        "SLIDEPOT"
        
    ];
    const digitalDeviceDict = [
        "BUTTON",
        "WATER",
        "BUZZER",
        "LED",
        "RELAY",
        "TEMPERATUREHUMIDITY",
        "ULTRASONIC"
    ];

    interface GroveOptions extends MessageOptions {
        port: number,
        value?: string,
        devType?: string,
        mode?: string
    }

    function invoke(target: string, options: MessageOptions) {
        pi.rpcCall("grove", target, options);
    }

    /**
     * analogport
     */
    //% fixedInstances
    export class AnalogPort {
        protected port : number;
        constructor(_port: number) {
            this.port = _port;
        }

        /**
         * Configure a port
         */
        //% blockId=analogPort block="set %this to device %type"
        setPort(type: AnalogDeviceType) {
            invoke("setComponentType", <GroveOptions>{
                port : this.port,
                devType : analogDeviceDict[type],
                mode: "ANALOG"
            });
        }
    }
    //% fixedInstance block="Analog Port 0"
    export const aPort1 = new AnalogPort(0);
    //% fixedInstance block="Analog Port 1"
    export const aPort2 = new AnalogPort(1);
    //% fixedInstance block="Analog Port 2"
    export const aPort3 = new AnalogPort(2);
}