/*
 * Copyright (c) 2006-2009 Erin Catto http://www.box2d.org
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

// #if B2_ENABLE_CONTROLLER

import { b2Controller } from "./b2Controller";
import { b2Vec2, b2_epsilon, b2Color, b2TimeStep, b2Draw } from "../../../Box2D/Box2D/Box2D";

/**
 * Calculates buoyancy forces for fluids in the form of a half
 * plane.
 */
export class b2BuoyancyController extends b2Controller {
  /**
   * The outer surface normal
   */
  normal = new b2Vec2(0, 1);
  /**
   * The height of the fluid surface along the normal
   */
  offset = 0;
  /**
   * The fluid density
   */
  density = 0;
  /**
   * Fluid velocity, for drag calculations
   */
  velocity = new b2Vec2(0, 0);
  /**
   * Linear drag co-efficient
   */
  linearDrag = 0;
  /**
   * Angular drag co-efficient
   */
  angularDrag = 0;
  /**
   * If false, bodies are assumed to be uniformly dense, otherwise
   * use the shapes densities
   */
  useDensity = false; //False by default to prevent a gotcha
  /**
   * If true, gravity is taken from the world instead of the
   */
  useWorldGravity = true;
  /**
   * Gravity vector, if the world's gravity is not used
   */
  gravity = new b2Vec2(0, 0);

  Step(step: b2TimeStep) {
    if (!this.m_bodyList)
      return;
    if (this.useWorldGravity) {
      this.gravity.Copy(this.GetWorld().GetGravity());
    }
    for (var i = this.m_bodyList; i; i = i.nextBody) {
      var body = i.body;
      if (!body.IsAwake()) {
        //Buoyancy force is just a function of position,
        //so unlike most forces, it is safe to ignore sleeping bodes
        continue;
      }
      var areac = new b2Vec2();
      var massc = new b2Vec2();
      var area = 0;
      var mass = 0;
      for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.m_next) {
        var sc = new b2Vec2();
        var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
        area += sarea;
        areac.x += sarea * sc.x;
        areac.y += sarea * sc.y;
        var shapeDensity = 0;
        if (this.useDensity) {
          //TODO: Expose density publicly
          shapeDensity = fixture.GetDensity();
        } else {
          shapeDensity = 1;
        }
        mass += sarea * shapeDensity;
        massc.x += sarea * sc.x * shapeDensity;
        massc.y += sarea * sc.y * shapeDensity;
      }
      areac.x /= area;
      areac.y /= area;
      //    b2Vec2 localCentroid = b2MulT(body->GetXForm(),areac);
      massc.x /= mass;
      massc.y /= mass;
      if (area < b2_epsilon)
        continue;
      //Buoyancy
      var buoyancyForce = this.gravity.Clone().SelfNeg();
      buoyancyForce.SelfMul(this.density * area);
      body.ApplyForce(buoyancyForce, massc);
      //Linear drag
      var dragForce = body.GetLinearVelocityFromWorldPoint(areac, new b2Vec2());
      dragForce.SelfSub(this.velocity);
      dragForce.SelfMul((-this.linearDrag * area));
      body.ApplyForce(dragForce, areac);
      //Angular drag
      //TODO: Something that makes more physical sense?
      body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
    }
  }

  Draw(debugDraw: b2Draw) {
    var r = 100;
    var p1 = new b2Vec2();
    var p2 = new b2Vec2();
    p1.x = this.normal.x * this.offset + this.normal.y * r;
    p1.y = this.normal.y * this.offset - this.normal.x * r;
    p2.x = this.normal.x * this.offset - this.normal.y * r;
    p2.y = this.normal.y * this.offset + this.normal.x * r;
  
    var color = new b2Color(0, 0, 0.8);
  
    debugDraw.DrawSegment(p1, p2, color);
  }
}

// #endif
