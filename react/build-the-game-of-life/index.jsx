var board = []; // 区域
var width = 70; // 区域宽
var height = 50; // 区域高
var cells = width * height; //细胞数
var running = 0; // 控制是否运行的参数
var delay = 50; // 控制速度的参数
var generation = 0; // 表示代数的参数


var ReactCell; // 细胞区域组件

// 引入ReactBootstrap 以方便布局
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var Label = ReactBootstrap.Label;
var Badge = ReactBootstrap.Badge;
var ButtonGroup = ReactBootstrap.ButtonGroup;

var openModalRunning;

var Header = React.createClass({
	setRun(){
		if(running === 0){
			running = 1;
			runIt();
		}
	},
	setStop(){
		if(running===1){
			running=0;
		}
	},
	clear() {
		running = 0;
		generation = 0;
		clearBoard();
		drawBoard();
		$("#gens").text('0');
	},
	getInitialState(){
		return {showModal:false};
	},
	close(){
		this.setState({showModal:false});
		running = openModalRunning;
		runIt();
	},
	open(){
		openModalRunning = running;
		running=0;
		this.setState({showModal:true});
	},
	render(){
		return (
			<header>
				<Panel header="ReactJS游戏——细胞生命模拟器">
					<ButtonGroup>
					<Button
						id="run"
						bsSize="small"
						onClick={this.setRun}
						>
						运行
					</Button>
					<Button
						id="pasue"
						bsSize="small"
						onClick={this.setStop}
						>
						暂停
					</Button>
					<Button
						id="clear"
						bsSize="small"
						onClick={this.clear}
						>
						清除
					</Button>
					</ButtonGroup>
					<Label bsStyle="info">存活代数:<Badge><span id="gens"></span></Badge></Label>
					<ButtonGroup>
					<Button
						bsSize="small"
						onClick={this.open}
						>
						关于这个游戏
					</Button>
					</ButtonGroup>
				</Panel>

				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>
							关于细胞生命模拟游戏
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							细胞生命模拟是在一个无限的二维矩形网格上播放演示细胞繁殖演化的程序。游戏在如下的一个HxW区域内进行模拟。
						</p>
						<pre>
[<br/>
0,         1,...,       W-2, W-1,<br/>
W,       W+1,...,      2W-2, 2W-1,<br/>
.................................<br/>
(H-1)W, (H-1)W+1,...,  HW-2, HW-1<br/>
]
</pre>
						<p>
							每个细胞都可以是"存活"或者"死亡"状态。每个细胞的状态取决于其周围与之接触
							的细胞（共8个——上下左右4个位置和斜线相邻的4个位置）。具体有这样一些规则
							<ol>
								<li>初始模式是第1代</li>
								<li>以后每代的情况由上代情况依据相应规则决定（这些规则反复应用）</li>
								<ul>
									<li>如果存活细胞周围有2-3个存活细胞，则它继续存活</li>
									<li>如果死亡细胞周围有3个存活细胞，则它变为活</li>
									<li>其他情况该细胞死亡</li>
								</ul>
								<li>每次对所有细胞应用一遍上述规则产生新一代情况，代数都增加1</li>
								<li>区域是球形展开区域，即模拟区域中，"0"，"W-1","(H-1)W","HW-1"这4个点是相邻的。
								</li>
							</ol>
						</p>
						<p>
							还可以随机选择某个细胞为存活，以影响模拟的发展
						</p>
						<p>更多情况可以点击<a href="http://www.math.cornell.edu/~lipa/mec/lesson6.html" target="_blank">这里</a>了解</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>关闭</Button>
					</Modal.Footer>
				</Modal>
			</header>
		);
	}

})


var Footer = React.createClass({
		getInitialState(){
			return {
				sp:{s:"default",m:"primary",f:"default"},
				size:{s:"default",m:"primary",l:"default"}
			}
		},
	  oz50(){
			running = 0;
			width = 50;
			height = 30;
			cells = width * height;
			clearBoard();
			createBoard();
			$('.cell:nth-child(70n + 1)').css("clear", "none");
			$('.cell:nth-child(100n + 1)').css("clear", "none");
			$('.cell:nth-child(50n + 1)').css("clear", "both");
			$('.cell').css({"width":"10px","height":"10px"})
			$('#gameshow').css({"width": "650px", "height": "390px"});
			activateBoard();
			this.setState({size:{s:"primary",m:"default",l:"default"}});
			//console.log("w: " + width + " h: " + height);

		},
		oz70(){
			running = 0;
			width = 70;
			height = 50;
			cells = width * height;
			clearBoard();
			createBoard(board);
			$('.cell:nth-child(100n + 1)').css("clear", "none");
			$('.cell:nth-child(50n + 1)').css("clear", "none");
			$('.cell:nth-child(70n + 1)').css("clear", "both");
			$('.cell').css({"width":"10px","height":"10px"})
			$('#gameshow').css({"width": "840px", "height": "600px"});
			this.setState({size:{s:"default",m:"primary",l:"default"}});
			activateBoard();
		},
		oz100(){
			running = 0;
			width = 100;
			height = 80;
			cells = width * height;
			clearBoard();
			createBoard(board);
			$('.cell:nth-child(50n + 1)').css("clear", "none");
			$('.cell:nth-child(70n + 1)').css("clear", "none");
			$('.cell:nth-child(100n + 1)').css("clear", "both");
			$('.cell').css({"width":"8px","height":"8px"})
			$('#gameshow').css({"width": "900", "height": "720"});
			activateBoard();
			this.setState({size:{s:"default",m:"default",l:"primary"}});
			//console.log("w: " + width + " h: " + height);
		},
		slow(){
			delay = 200;
			this.setState({sp:{s:"primary",m:"default",f:"default"}});
		},
		medium(){
			delay = 110;
			this.setState({sp:{s:"default",m:"primary",f:"default"}});
		},
		fast(){
			delay = 50;
			this.setState({sp:{s:"default",m:"default",f:"primary"}});
		},
		render(){
			return (
				<footer>
					<Panel header="运行中可以自由添加新细胞（年轻细胞）。 细胞为亮红色代表年轻的，深红为老年的">
						<Label bsStyle="info">环境尺寸:</Label>
						<ButtonGroup>
						<Button id="z50" bsSize="small" onClick={this.oz50} bsStyle={this.state.size.s}>
							50x30
						</Button>
						<Button id="z70" bsSize="small" onClick={this.oz70} bsStyle={this.state.size.m}>
							70x50
						</Button>
						<Button id="z100" bsSize="small" onClick={this.oz100} bsStyle={this.state.size.l}>
							100x80
						</Button>
						</ButtonGroup>
					&nbsp;&nbsp;&nbsp;&nbsp;<Label bsStyle="info">模拟速度:</Label>
					<ButtonGroup>
						<Button id="slow" bsSize="small" onClick={this.slow}  bsStyle={this.state.sp.s}>
							慢&nbsp;&nbsp;&nbsp;速
						</Button>
						<Button id="medium" bsSize="small" onClick={this.medium} bsStyle={this.state.sp.m}>
							中&nbsp;&nbsp;&nbsp;速
						</Button>
						<Button id="fast" bsSize="small" onClick={this.fast}  bsStyle={this.state.sp.f}>
							快&nbsp;&nbsp;&nbsp;速
						</Button>
						</ButtonGroup>
					</Panel>
				</footer>
			);
		}
});

$(document).ready(function() {
	ReactDOM.render(<Header />, document.getElementById('header'));
	ReactDOM.render(<Footer />, document.getElementById('footer'));
	$("#gens").text("0");
	clearBoard();
	initialSet();
	createBoard();
	activateBoard();
	running = 1;
	runIt();
});


function clearBoard() { //清除区域，全部为死亡细胞
	board = [];
	var i=0;
	for(var y=0;y<height;y++){
		for(var x=0;x<width;x++){
			board[i]={id:i,status: "cell dead"};
			i++;
		}
	}
	generation = 0;
	$("#gens").text("0");
};


function createBoard() { // 建立区域
	$('#gameshow').empty();

	ReactCell = React.createClass({

		getInitialState() {
			// 注意传入的参数是全局board数据
			return {cellBoard: board};
		},
		componentDidMount() {
			//componentDidMount is called when the component is rendered. This can
			//be uncommented so that repeated drawBoard() calls are not required.

			//this.timer = setInterval(this.updateCells, delay);
		},
		//componentWillUnmount is called if the component is closed
		componentWillUnmount() {
			//clearInterval(this.timer);
		},
		updateCells() {
			this.setState({cellBoard: this.props.board});
		},
		render() {
			return (
				<Panel>
					<div>
					{this.props.board.map(function(cell, i) {
						return(<div className={cell.status} key={i} id={i}></div>);
					})
					}
					</div>
				</Panel>
			);
	    }
	});
	drawBoard();
}

function runGeneration() { //运行一代的处理
	var newBoard = [];// 用于新一代数据存储
	var cellStatus = '';
	var i=0;
	for(var y=0;y<height;y++){
		for(var x=0;x<width;x++){
			// 默认都是死亡细胞
			newBoard.push({id:i,status: "cell dead"});
			var check=cellCheck(x,y);
			// 如果当前存活，且周围存活的是3或者2，则继续存活
			if ((board[i].status == "cell alive" || board[i].status == "cell alive old") && (check == 3 || check == 2)) {
				newBoard[i].status="cell alive old";
			}
			// 如果当前死亡,且周围存活是3，则变为存活
			if (board[i].status == "cell dead" && check == 3) {
				newBoard[i].status= "cell alive";
			}
			i++;
		};
	};

	//检测是否所有细胞已经死亡，如果都死亡则停止后续计算
	for (var i = 0; i < cells; i++) {
		if (board[i].status == "cell alive" || board[i].status == "cell alive old") {break;}
		if (i == cells - 1) {
			console.log("所有细胞已经死亡，重新游戏  :)");
			running = 0;
			clearBoard();
			drawBoard();
		}
	}
	return newBoard;
};


function drawBoard(passedBoard) {
	ReactDOM.render(<ReactCell board={board} generation={generation}/>, document.getElementById('gameshow'));
};


function activateBoard() { // 对于点选的一个细胞，设置状态（取反状态，即死亡的变成存活，存活的变成死亡）
	$('.cell').click(function() {
		var cellNum = $(this).attr('id');
		if (board[cellNum].status == "cell alive" || board[cellNum].status == "cell alive old") {
			board[cellNum].status = "cell dead";
		} else {
			board[cellNum].status = "cell alive";
		}
		drawBoard();
		//console.log(cellNum + " " + board[cellNum].status);
	})
};


function runIt() {
	if (running == 1) {
		setTimeout(function() {
      generation++;
			board = runGeneration();
			$("#gens").text(generation);
			setTimeout(function() {
				drawBoard();
				runIt();
			},delay);
		},0);
	}
};

function cellCheck(x,y){
	// 当前点位 y*width+x;
	// 相邻矩阵为
	var count=0;
	var lm0=(y-1)<0?height-1:y-1;
	var lm1=y;
	var lm2=(y+1)==height?0:y+1;

	var tm0=(x-1)<0?width-1:x-1;
	var tm1=x;
	var tm2=(x+1)==width?0:x+1;
	var en=[
		lm0*width+tm0, lm0*width+tm1, lm0*width+tm2,
		lm1*width+tm0,               lm1*width+tm2,
		lm2*width+tm0, lm2*width+tm1, lm2*width+tm2
		];
		for(var j=0;j<8;j++){
			if( board[en[j]].status == "cell alive" || board[en[j]].status == "cell alive old"){
				count++;
			}
		}
		return count;
}

function initialSet() {
	// 随机分布初始细胞存活状态

	for (var i = 0; i < cells; i++) {
		var schrodingersCell = Math.floor(Math.random() * 2);
		if (schrodingersCell === 0) {
			board[i] = {id: i, status: "cell alive old"};
		} else {
			board[i] = {id: i, status: "cell dead"};
		}
	}
};
