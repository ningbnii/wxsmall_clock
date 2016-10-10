// 获取应用实例
Page({
	data:{
		width:0,
		height:0
	},
	onLoad: function(){
		var that = this
		wx.getSystemInfo({
			success: function(res) {
				that.width = res.windowWidth
				that.height = res.windowHeight
			}
		})
	},
	onReady: function(){

		this.canvasApp()
		this.interval = setInterval(this.canvasApp,1000)
	},
	canvasApp: function(){
		var context = wx.createContext()
		var width = this.width
		var height = this.height
		var FONT_HEIGHT = 15
		var MARGIN = 35
		var HAND_TRUNCATION = width/25
		var HOUR_HAND_TRUNCATION = width/10
		var NUMBER_SPACING = 20
		var RADIUS = width/2 - MARGIN
		var HAND_RADIUS = RADIUS + NUMBER_SPACING
		
		


		function drawCircle(){
			context.beginPath()
			context.arc(width/2,height/2,RADIUS,0,Math.PI*2)
			context.stroke()
		}

		function drawNumerals(){
			var numerals = [1,2,3,4,5,6,7,8,9,10,11,12]
			var angle = 0
			var numeralWidth = 0

			numerals.forEach(function(numeral){
				angle = Math.PI/6*(numeral-3)
				context.fillText(numeral,width/2+Math.cos(angle)*HAND_RADIUS,height/2+Math.sin(angle)*HAND_RADIUS)
			})
		}

		function drawCenter(){
			context.beginPath()
			context.arc(width/2, height/2, 5, 0, Math.PI*2)
			context.fill()
		}

		function drawHand(loc, isHour){
			var angle = (Math.PI*2) * (loc/60) - Math.PI/2
			var handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION;

			context.moveTo(width/2, height/2)
			context.lineTo(width/2+Math.cos(angle)*handRadius, height/2+Math.sin(angle)*handRadius)
			context.stroke()
		}

		function drawHands(){
			var date = new Date
			var hour = date.getHours()
			hour = hour > 12 ? hour - 12 : hour

			drawHand(hour*5 + (date.getMinutes()/60)*5, true)
			drawHand(date.getMinutes(),false)
			drawHand(date.getSeconds(),false)
		}

		function drawClock(){
			
			drawCircle()
			drawCenter()
			drawHands()
			drawNumerals()
		}

		drawClock()

		wx.drawCanvas({
			canvasId:'myCanvas',
			actions: context.getActions()
		})
	},
	onUnload:function(){
		clearInterval(this.interval)
	}
})

