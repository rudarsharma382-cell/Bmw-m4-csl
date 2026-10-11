// Verified BMW M4 CSL (G82) Technical Specifications
// Strictly adheres to Section 8 of antigravity.md

export const VERIFIED_SPECS = {
  model: "BMW M4 CSL",
  chassisCode: "G82",
  production: "Limited to 1,000 units globally",
  curbWeightDIN: "1,625 kg",
  weightDelta: "-100 kg vs M4 Competition",
  weightDistribution: "53.4% Front / 46.6% Rear",
  
  powertrain: {
    engine: "3.0 L M TwinPower Turbo inline-6 (S58 B30T0)",
    aspiration: "Mono-scroll bi-turbo with 2.1 bar maximum boost pressure",
    power: "550 hp (405 kW) @ 6,250 rpm",
    torque: "650 Nm (479 lb-ft) @ 2,750 – 5,950 rpm",
    specificOutput: "183.3 hp / litre",
    redline: "7,200 rpm",
    transmission: "8-speed M Steptronic with Drivelogic",
    drive: "Rear-wheel drive (Active M Differential)",
  },

  performance: {
    accel0to100: "3.7 s",
    accel0to200: "10.7 s",
    topSpeed: "307 km/h (governed, M Driver's Package standard)",
    nurburgringLap: "7:15.677 min (Nordschleife full 20.832 km)",
    nurburgringLapShort: "7:10.903 min (20.6 km version)",
    powerToWeight: "2.95 kg / hp",
  },

  weightSavings: [
    {
      component: "M Carbon Full Bucket Seats",
      delta: "-24.0 kg",
      detail: "Fixed backrest angle, manual reach adjustment, helmet cutouts, pure carbon shell",
    },
    {
      component: "Rear Bench & Seatbelts Deletion",
      delta: "-21.0 kg",
      detail: "Replaced by integrated helmet storage nets and partitioned partition bulkhead",
    },
    {
      component: "Sound Insulation Optimization",
      delta: "-15.0 kg",
      detail: "Strategic reduction of acoustic damping panels and interior floor insulation",
    },
    {
      component: "M Carbon Ceramic Brakes",
      delta: "-14.3 kg",
      detail: "6-piston fixed front callipers with 400 mm rotors; single-piston floating rear",
    },
    {
      component: "CFRP Body Panels & Bootlid",
      delta: "-11.0 kg",
      detail: "CFRP bonnet, double-bubble roof, and distinctive integrated ducktail boot lid",
    },
    {
      component: "Forged Light-Alloy Wheels & Chassis Links",
      delta: "-10.4 kg",
      detail: "19-inch front / 20-inch rear Star-spoke 827 M wheels; revised axle kinematics",
    },
    {
      component: "Titanium Exhaust Silencer",
      delta: "-4.3 kg",
      detail: "Dual-branch titanium rear silencer with matte black quad tailpipe finishers",
    },
  ],

  aerodynamics: [
    {
      label: "CFRP Front Splitter",
      value: "Downforce Generation",
      detail: "Carbon-fibre front splitter with red contour lines optimizes underbody airflow.",
    },
    {
      label: "Integrated Ducktail Spoiler",
      value: "Zero-drag Balance",
      detail: "Boot lid crafted from CFRP with an upward-swept aero kicktail inspired by the E46 M3 CSL.",
    },
    {
      label: "Laserlight Signature",
      value: "GT3 Racing Yellow",
      detail: "Daytime driving lights glow bright yellow in homage to endurance GT racing machinery.",
    },
    {
      label: "Laser Rear Light Threads",
      value: "Glass Fiber Technology",
      detail: "Filigree light threads illuminated by laser diodes create an unmistakable night silhouette.",
    },
  ],

  chassis: {
    suspension: "Adaptive M suspension with electronically controlled dampers, lowered by 8 mm",
    camber: "Individually calibrated wheel camber values at front and rear axles",
    tyres: "Michelin Pilot Sport Cup 2 R (Front: 275/35 ZR19, Rear: 285/30 ZR20)",
    bracing: "Cast aluminium front-end strut brace engineered for torsional rigidity",
  },
};
