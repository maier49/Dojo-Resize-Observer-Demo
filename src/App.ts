import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import Card from './widgets/Card';
import Article from './widgets/Article';
import SplitPane, { Direction } from '@dojo/widgets/split-pane';
import * as css from './styles/app.m.css';
const forkMe = require('./img/forkMe.png');

export class App extends WidgetBase {

	private _size = 800;

	private _onSplitPaneResize(size: number) {
		this._size = size;
		this.invalidate();
	}

	protected render() {
		return v('div', { key: 'root', classes: css.root }, [
			w(SplitPane, {
				key: 'split-pane',
				direction: Direction.column,
				size: this._size,
				onResize: this._onSplitPaneResize,
				extraClasses: {
					divider: css.divider
				}
			}, [
				v('div', { classes: [ css.pane, css.articlePane ] }, [
					v('a', { classes: css.ribbon, target: '_blank', href: 'https://github.com/tomdye/Dojo-Resize-Observer-Demo' }, [
						v('img', { src: forkMe, alt: 'Fork me on GitHub'})
					 ]),
					w(Article, {})
				]),
				v('div', { classes: [ css.pane, css.cardPane ] }, [
					w(Card, {})
				])
			])
		]);
	}
}

export default App;
