const data = {
    "_id": "019a69bd-ff64-705f-8c5c-6944df5ab5ed",
    "slug": "thanksgiving-dinner-celebration",
    "title": "Thanksgiving Dinner Celebration",
    "description": "Experience the warmth and joy of Thanksgiving as friends gather in a cozy apartment to prepare a traditional feast, share gratitude, and celebrate together under the autumn sky.",
    "roles": [
      {
        "id": "Host",
        "label": "Host",
        "required": true,
        "editable": true,
        "videoDescriptionFallback": "The warm and welcoming host who loves bringing people together over good food and laughter.",
        "order": 1
      },
      {
        "id": "Friend",
        "label": "Friend",
        "required": true,
        "editable": true,
        "videoDescriptionFallback": "A close friend who helps in the kitchen and keeps the energy joyful.",
        "order": 2
      },
      {
        "id": "Guest",
        "label": "Guest",
        "required": true,
        "editable": true,
        "videoDescriptionFallback": "A cheerful guest who adds humor and warmth to the celebration.",
        "order": 3
      }
    ],
    "models": {
      "textToImage": {
        "modelName": "scene-generator",
        "modelId": "scene-generator-api",
        "modelParams": {
          "aspectRatio": "16:9",
          "seed": -1,
          "style": "THREE_D_ANIMATION"
        }
      },
      "imageToVideo": {
        "modelName": "kling-image-to-video",
        "modelId": "veo3-api",
        "modelParams": {
          "duration": 5
        }
      }
    },
    "shots": [
      {
        "id": "shot-0",
        "order": 0,
        "type": "SHOT_WITHOUT_CAST",
        "title": "City Neighborhood Aerial View",
        "storyline": "An establishing aerial shot showcasing the cozy modern city neighborhood at golden sunset, setting a peaceful and cinematic atmosphere.",
        "textToImage": {
          "promptParams": {
            "prompt": "Extreme aerial wide shot of a cozy modern city neighborhood at golden sunset. Brick apartment buildings line narrow streets covered in golden autumn leaves. One rooftop terrace glows with warm light, surrounded by strings of bulbs and pumpkins. Steam rises from nearby chimneys as the amber sky fades to dusk. 3D Pixar cinematic animation style."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Slow Push in] Camera slowly moves toward the glowing rooftop terrace as steam rises and golden light creates a warm, inviting atmosphere."
          }
        }
      },
      {
        "id": "shot-1",
        "order": 1,
        "type": "SHOT_WITH_CAST",
        "title": "Kitchen Preparation Together",
        "storyline": "Inside the warm apartment kitchen, the group works together preparing the Thanksgiving meal.",
        "textToImage": {
          "promptParams": {
            "prompt": "Medium side shot inside a cozy modern apartment kitchen illuminated by tungsten light. @Host arranges vegetables on a cutting board, @Friend stirs a pot on the stove, and @Guest pours sauce into a bowl. The scene captures a cinematic, collaborative cooking moment filled with warmth and laughter."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Static] The characters move naturally as they cook, chopping, stirring, and pouring in a relaxed, joyful rhythm."
          }
        }
      },
      {
        "id": "shot-2",
        "order": 2,
        "type": "SHOT_WITH_CAST",
        "title": "Carrot Dicing Close-up",
        "storyline": "A detailed close-up of the Host's hands carefully dicing roasted carrots, showing care and attention to detail.",
        "textToImage": {
          "promptParams": {
            "prompt": "Close-up of @Host's hands dicing roasted carrots on a wooden cutting board. Steam rises from nearby pots, and warm pendant light glows across copper utensils, giving a soft, cinematic atmosphere."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Slow Push in] The knife motion slows as steam drifts upward, emphasizing the calm, deliberate preparation."
          }
        }
      },
      {
        "id": "shot-3",
        "order": 3,
        "type": "SHOT_WITH_CAST",
        "title": "Living Room Candle Lighting",
        "storyline": "The group transitions to the cozy living room, setting the table and lighting candles for dinner.",
        "textToImage": {
          "promptParams": {
            "prompt": "Medium shot of a cozy living room and dining area with exposed brick walls and glowing string lights. @Friend adjusts glasses, @Guest arranges flowers, and @Host lights a candle. The space glows with warm amber tones, filled with holiday charm."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Pan right] The candles flicker as the characters finish preparing the table, with soft reflections and a festive mood."
          }
        }
      },
      {
        "id": "shot-4",
        "order": 4,
        "type": "SHOT_WITHOUT_CAST",
        "title": "Pumpkin Pie Detail",
        "storyline": "A tight close-up of a beautiful pumpkin pie resting on the windowsill, glowing in the warm light of the kitchen.",
        "textToImage": {
          "promptParams": {
            "prompt": "Close-up of a golden-brown pumpkin pie on a windowsill with soft steam rising and amber reflections on the glass. The room glows warmly behind it, blending dusk and candlelight."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Push in] Steam swirls gently upward as the camera approaches the pie, emphasizing warmth and comfort."
          }
        }
      },
      {
        "id": "shot-5",
        "order": 5,
        "type": "SHOT_WITH_CAST",
        "title": "Candlelight Ignition",
        "storyline": "The Guest lights a candle, with the flame casting a golden glow across the table.",
        "textToImage": {
          "promptParams": {
            "prompt": "Extreme close-up of @Guest lighting a candle on the dining table. The flame casts soft reflections across wine glasses, utensils, and small pumpkins arranged neatly on a linen runner."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Push in] The flame steadies as candlelight spreads across the table, creating a peaceful and festive atmosphere."
          }
        }
      },
      {
        "id": "shot-6",
        "order": 6,
        "type": "SHOT_WITH_CAST",
        "title": "Friends Toasting Together",
        "storyline": "The Host, Friend, and Guest raise their glasses to celebrate friendship and gratitude.",
        "textToImage": {
          "promptParams": {
            "prompt": "Medium close-up of @Host, @Friend, and @Guest seated around a Thanksgiving dinner table, raising their glasses in a joyful toast. The table glows with candles and autumn colors in a 3D cinematic style."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Push in] The characters raise their glasses together, candlelight flickering warmly across their smiles."
          }
        }
      },
      {
        "id": "shot-7",
        "order": 7,
        "type": "SHOT_WITH_CAST",
        "title": "Peaceful Rooftop Night View",
        "storyline": "The story ends with the three friends standing together on the quiet rooftop, overlooking the glowing city skyline.",
        "textToImage": {
          "promptParams": {
            "prompt": "Wide shot of @Host, @Friend, and @Guest standing together on a softly lit rooftop terrace at night, overlooking the glowing city skyline beneath string lights and the autumn sky."
          }
        },
        "imageToVideo": {
          "promptParams": {
            "prompt": "[Pull out, Pedestal up] The camera slowly pulls back, revealing the rooftop and city skyline as the friends share a quiet, reflective moment."
          }
        }
      }
    ],
    "configurableOptions": {
      "aspectRatio": {
        "enabled": true,
        "options": [
          "9:16",
          "16:9",
          "1:1",
          "21:9",
          "2:3"
        ],
        "default": "16:9"
      },
      "style": {
        "enabled": true,
        "options": [
          "THREE_D_ANIMATION"
        ],
        "default": "THREE_D_ANIMATION"
      },
      "quality": {
        "enabled": true,
        "options": [
          "standard",
          "high"
        ],
        "default": "high"
      }
    },
}